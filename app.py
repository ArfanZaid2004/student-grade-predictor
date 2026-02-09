from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from functools import wraps
import pickle
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import random

app = Flask(__name__)

# ================= SESSION CONFIG =================
app.secret_key = "supersecretkey123"
app.config.update(
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=False
)

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

#  ================= DATABASE =================
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:Root%40123@localhost:3306/student_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# ================= LOAD ML MODEL =================
model = None
try:
    with open("models/student_model.pkl", "rb") as f:
        model = pickle.load(f)
    print("ML model loaded successfully")
except Exception as e:
    print("Model load error:", e)

# ================= AUTH =================
DEFAULT_USERS = [
    {"username": "Admin", "password": "Admin@123", "role": "admin"},
    {"username": "User", "password": "User@123", "role": "user"},
]

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user" not in session:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

def is_admin():
    return session.get("role") == "admin" 

def current_username():
    return session.get("user")

@app.route("/captcha", methods=["GET"])
def captcha():
    a = random.randint(1, 9)
    b = random.randint(1, 9)
    session["captcha_answer"] = str(a + b)
    return jsonify({"question": f"{a} + {b} = ?"}), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = (data or {}).get("username")
    password = (data or {}).get("password")
    captcha_answer = (data or {}).get("captcha_answer")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    if not captcha_answer:
        return jsonify({"error": "Captcha answer required"}), 400
    if session.get("captcha_answer") != str(captcha_answer).strip():
        return jsonify({"error": "Captcha incorrect"}), 403

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    session["user"] = user.username
    session["role"] = user.role
    return jsonify({
        "message": "Login successful",
        "user": {"username": user.username, "role": user.role}
    }), 200

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = (data or {}).get("username")
    password = (data or {}).get("password")
    confirm = (data or {}).get("confirm_password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    if len(username) < 3:
        return jsonify({"error": "Username must be at least 3 characters"}), 400
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400
    if confirm is not None and password != confirm:
        return jsonify({"error": "Passwords do not match"}), 400

    existing = User.query.filter_by(username=username).first()
    if existing:
        return jsonify({"error": "Username already exists"}), 409

    user = User(
        username=username,
        password_hash=generate_password_hash(password),
        role="user",
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful",
        "user": {"username": user.username, "role": user.role}
    }), 201

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    session.pop("role", None)
    return jsonify({"message": "Logged out"}), 200

@app.route("/check-auth", methods=["GET"])
def check_auth():
    if "user" in session:
        return jsonify({
            "authenticated": True,
            "user": {
                "username": session.get("user"),
                "role": session.get("role", "user")
            }
        }), 200
    return jsonify({"authenticated": False}), 401

# ================= MODELS =================
class Student(db.Model):
    __tablename__ = "student"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(100))
    weekly_self_study_hours = db.Column(db.Float)
    attendance_percentage = db.Column(db.Float)
    class_participation = db.Column(db.Float)
    created_by = db.Column(db.String(50), nullable=False, default="Admin")

    predicted_grade = db.Column(db.String(1))
    predicted_score = db.Column(db.Float)

    created_at = db.Column(db.DateTime, default=datetime .utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "weekly_self_study_hours": self.weekly_self_study_hours,
            "attendance_percentage": self.attendance_percentage,
            "class_participation": self.class_participation,
            "created_by": self.created_by,
            "predicted_grade": self.predicted_grade,
            "predicted_score": self.predicted_score
        }

class PredictionHistory(db.Model):
    __tablename__ = "prediction_history"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, nullable=False)
    student_name = db.Column(db.String(100))
    grade = db.Column(db.String(1))
    score = db.Column(db.Float)
    confidence = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "student_name": self.student_name,
            "grade": self.grade,
            "score": self.score,
            "confidence": self.confidence,
            "created_at": self.created_at.isoformat()
        }

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="user")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "role": self.role,
            "created_at": self.created_at.isoformat()
        }

def seed_default_users():
    if User.query.count() > 0:
        return
    for u in DEFAULT_USERS:
        user = User(
            username=u["username"],
            password_hash=generate_password_hash(u["password"]),
            role=u["role"],
        )
        db.session.add(user)
    db.session.commit()

# ================= STUDENTS =================
@app.route("/students", methods=["GET"])
@login_required
def get_students():
    query = Student.query
    if not is_admin():
        query = query.filter(Student.created_by == current_username())
    students = query.all()
    return jsonify([s.to_dict() for s in students]), 200

@app.route("/students", methods=["POST"])
@login_required
def add_student():
    data = request.json
    student = Student(
        user_id=data["user_id"],
        name=data["name"],
        weekly_self_study_hours=float(data["study"]),
        attendance_percentage=float(data["attendance"]),
        class_participation=float(data["participation"]),
        created_by=current_username()
    )
    db.session.add(student)
    db.session.commit()
    return jsonify({"message": "Student added"}), 201

@app.route("/students/<int:id>", methods=["PUT"])
@login_required
def update_student(id):
    s = Student.query.get_or_404(id)
    if not is_admin() and s.created_by != current_username():
        return jsonify({"error": "Forbidden"}), 403
    data = request.json
    s.user_id = data["user_id"]
    s.name = data["name"]
    s.weekly_self_study_hours = float(data["study"])
    s.attendance_percentage = float(data["attendance"])
    s.class_participation = float(data["participation"])
    db.session.commit()
    return jsonify({"message": "Student updated"}), 200

@app.route("/students/<int:id>", methods=["DELETE"])
@login_required
def delete_student(id):
    s = Student.query.get_or_404(id)
    if not is_admin() and s.created_by != current_username():
        return jsonify({"error": "Forbidden"}), 403
    db.session.delete(s)
    db.session.commit()
    return jsonify({"message": "Student deleted"}), 200

# ================= PREDICT =================
@app.route("/predict/<int:id>", methods=["GET"])
@login_required
def predict(id):
    student = Student.query.get_or_404(id)
    if not is_admin() and student.created_by != current_username():
        return jsonify({"error": "Forbidden"}), 403

    if model is None:
        return jsonify({"error": "ML model not loaded"}), 500

    X = [[
        student.weekly_self_study_hours,
        student.attendance_percentage,
        student.class_participation
    ]]

    score = model.predict(X)[0]
    score = round(float(score), 2)

    if score >= 85:
        grade = "A"
    elif score >= 75:
        grade = "B"
    elif score >= 65:
        grade = "C"
    elif score >= 55:
        grade = "D"
    else:
        grade = "F"

    confidence = round(min(1, score / 100), 2)

    # SAVE HISTORY
    history = PredictionHistory(
        student_id=student.id,
        student_name=student.name,
        grade=grade,
        score=score,
        confidence=confidence
    )
    db.session.add(history)

    # UPDATE STUDENT
    student.predicted_grade = grade
    student.predicted_score = score

    db.session.commit()

    return jsonify({
        "student_name": student.name,
        "grade": grade,
        "score": score,
        "confidence": confidence
    }), 200

# ================= HISTORY =================
@app.route("/history", methods=["GET"])
@login_required
def get_history():
    grade = request.args.get("grade")
    start_date = request.args.get("start")
    end_date = request.args.get("end")

    query = PredictionHistory.query
    if not is_admin():
        query = query.join(Student, PredictionHistory.student_id == Student.id).filter(
            Student.created_by == current_username()
        )

    if grade and grade != "ALL":
        query = query.filter(PredictionHistory.grade == grade)

    if start_date:
        query = query.filter(
            PredictionHistory.created_at >= start_date
        )

    if end_date:
        query = query.filter(
            PredictionHistory.created_at <= end_date
        )

    history = query.order_by(PredictionHistory.created_at.desc()).all()
    return jsonify([h.to_dict() for h in history]), 200


@app.route("/dashboard-stats", methods=["GET"])
@login_required
def dashboard_stats():
    if not is_admin():
        return jsonify({"error": "Forbidden"}), 403
    total_students = Student.query.count()
    total_predictions = PredictionHistory.query.count()

    avg_conf = db.session.query(
        db.func.avg(PredictionHistory.confidence)
    ).scalar() or 0

    last_pred = PredictionHistory.query.order_by(
        PredictionHistory.created_at.desc()
    ).first()

    return jsonify({
        "total_students": total_students,
        "total_predictions": total_predictions,
        "average_confidence": round(avg_conf * 100, 1),
        "last_prediction_time": (
            last_pred.created_at.strftime("%H:%M %d-%m-%Y")
            if last_pred else "N/A"
        )
    }), 200
@app.route("/dashboard-charts", methods=["GET"])
@login_required
def dashboard_charts():
    if not is_admin():
        return jsonify({"error": "Forbidden"}), 403
    # Grade distribution
    grades = db.session.query(
        PredictionHistory.grade,
        db.func.count(PredictionHistory.id)
    ).group_by(PredictionHistory.grade).all()

    grade_data = [
        {"grade": g[0], "count": g[1]} for g in grades
    ]

    # Predictions over time
    timeline = db.session.query(
        db.func.date(PredictionHistory.created_at),
        db.func.count(PredictionHistory.id)
    ).group_by(
        db.func.date(PredictionHistory.created_at)
    ).all()

    time_data = [
        {"date": str(t[0]), "count": t[1]} for t in timeline
    ]

    return jsonify({
        "gradeDistribution": grade_data,
        "timeline": time_data
    }), 200

# ================= RUN =================
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed_default_users()
    app.run(debug=True, host="localhost", port=5000)
