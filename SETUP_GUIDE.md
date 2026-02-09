# 🚀 Setup Guide - Student Grade Prediction System

## System Requirements

| Requirement | Minimum | Recommended |
| ----------- | ------- | ----------- |
| Node.js     | 14.0    | 18.0 LTS    |
| Python      | 3.8     | 3.11        |
| MySQL       | 5.7     | 8.0         |
| RAM         | 2GB     | 4GB         |
| Disk Space  | 500MB   | 1GB         |

## Step-by-Step Installation

### 1️⃣ Prerequisites Setup (Windows)

#### Install Node.js

1. Download from https://nodejs.org (LTS version recommended)
2. Run the installer and follow prompts
3. Accept default settings
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### Install Python

1. Download from https://www.python.org/downloads/
2. **IMPORTANT**: Check "Add Python to PATH" during installation
3. Verify installation:
   ```bash
   python --version
   ```

#### Install MySQL

1. Download from https://dev.mysql.com/downloads/mysql/
2. Run installer and choose "MySQL Community Server"
3. Configure MySQL Server (default settings OK)
4. Start MySQL Service
5. Verify:
   ```bash
   mysql --version
   ```

#### Install Git (Optional but Recommended)

1. Download from https://git-scm.com/
2. Run installer with default settings

---

### 2️⃣ Clone or Extract Project

```bash
# If using Git
git clone <repository-url>
cd Student_predicts_Flask

# OR extract the zip file to your desired location
# Then open Command Prompt/PowerShell in that folder
```

---

### 3️⃣ Setup Backend (Flask + Python)

#### A. Create Virtual Environment

```bash
# Navigate to project root
cd Student_predicts_Flask

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# You should see (venv) at the start of your command line
```

#### B. Install Python Dependencies

```bash
# Make sure venv is activated
pip install flask flask-cors flask-sqlalchemy pymysql scikit-learn numpy pandas
```

#### C. Setup Database Connection

1. Open Command Prompt as Administrator
2. Start MySQL:
   ```bash
   mysql -u root -p
   ```
3. Create database:

   ```sql
   CREATE DATABASE student_grades;
   USE student_grades;
   ```

4. Create `.env` file in project root:

   ```
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_DB=student_grades
   FLASK_ENV=development
   ```

   _Replace `your_password` with your MySQL password_

5. Verify connection by running:

   ```bash
   python app.py
   ```

   You should see: `Running on http://localhost:5000`

#### D. Stop Backend for Now

Press `Ctrl+C` to stop the Flask server

---

### 4️⃣ Setup Frontend (React)

#### A. Install Node Dependencies

```bash
# Navigate to frontend folder
cd student-grade-frontend

# Install packages (this takes a few minutes)
npm install

# You should see many packages being installed
```

#### B. Create Environment File (Optional)

Create `.env` file in `student-grade-frontend/`:

```
REACT_APP_API_URL=http://localhost:5000
```

---

### 5️⃣ Start the Application

#### Terminal 1: Start Backend

```bash
# From project root with venv activated
python app.py

# You should see:
# * Running on http://localhost:5000
```

#### Terminal 2: Start Frontend

```bash
# From student-grade-frontend folder
npm start

# This will open http://localhost:3000 in your browser
```

**Success!** You should see the application with:

- Purple gradient background
- "Student Grade Prediction System" header
- Dark theme toggle button in top-right
- Add Student form on the left
- Student records table below

---

## ✅ Verification Checklist

- [ ] Both terminals show "Running" status
- [ ] Browser opens at http://localhost:3000
- [ ] Page loads with gradient background
- [ ] Dark theme toggle button works
- [ ] Form fields are visible and interactive
- [ ] No red errors in browser console (F12)
- [ ] No red errors in terminal windows

---

## 🎯 First Steps After Setup

### 1. Add a Test Student

1. Fill in the form:
   - Study Hours: `5.5`
   - Attendance: `85`
   - Participation: `8`
2. Click "Add Student ➕"
3. You should see a success message
4. Student appears in the table

### 2. Test Prediction

1. Click "🎯 Predict Grade" button
2. You should be taken to results page
3. See the predicted score and grade
4. Click "← Back to Home" to return

### 3. Test Theme Toggle

1. Click the 🌙 button in top-right
2. Background should change to dark mode
3. Refresh page - theme should persist

---

## 🔧 Troubleshooting

### Problem: "Cannot find module"

**Solution:**

```bash
cd student-grade-frontend
npm install
```

### Problem: "Connection refused" Backend

**Solution:**

1. Make sure MySQL is running
2. Check database credentials in `.env`
3. Verify MySQL is listening on port 3306

### Problem: Port 3000 already in use

**Solution:**

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problem: "Cannot GET /"

**Solution:**

- Ensure `npm start` is running in frontend folder
- Check that you're accessing http://localhost:3000 (not 5000)

### Problem: Errors in browser console

**Solution:**

1. Open DevTools: Press `F12`
2. Check Console tab for errors
3. Common fixes:
   - Refresh page: `Ctrl+R`
   - Clear cache: `Ctrl+Shift+Delete`
   - Hard refresh: `Ctrl+Shift+R`

### Problem: Backend crashes on startup

**Solution:**

1. Check MySQL is running
2. Verify `.env` file exists with correct credentials
3. Check Python version: `python --version` (should be 3.8+)
4. Reinstall dependencies: `pip install -r requirements.txt`

---

## 📊 Testing the API Directly

Use these curl commands to test backend:

```bash
# Health check
curl http://localhost:5000/health

# Get all students
curl http://localhost:5000/students

# Add student
curl -X POST http://localhost:5000/students ^
  -H "Content-Type: application/json" ^
  -d "{\"user_id\":\"U001\",\"name\":\"John\",\"weekly_self_study_hours\":5.5,\"attendance_percentage\":85,\"class_participation\":8}"

# Predict grade
curl http://localhost:5000/predict/1
```

---

## 🚀 Running in Production (Optional)

### Build Frontend for Production

```bash
cd student-grade-frontend
npm run build
# Creates optimized build in 'build/' folder
```

### Setup Production Server

```bash
# Install production server
pip install gunicorn

# Run Flask app with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

---

## 📚 Useful Resources

### Documentation

- [React Docs](https://react.dev)
- [Flask Docs](https://flask.palletsprojects.com)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [Python Docs](https://docs.python.org/3/)

### IDE Recommendations

- **VS Code** (Free) - Recommended
- **PyCharm Community** (Free Python)
- **WebStorm** (Paid, best for React)

### VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Python
- REST Client

---

## 🎓 Learning Resources

### Frontend Development

- [React Beginner Tutorial](https://react.dev/learn)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [JavaScript Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)

### Backend Development

- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
- [RESTful API Design](https://restfulapi.net/)
- [Database Design](https://www.database-tutorial.com/)

### Machine Learning

- [scikit-learn Tutorials](https://scikit-learn.org/stable/modules/classes.html)
- [Machine Learning Basics](https://www.kaggle.com/learn/intro-to-machine-learning)

---

## 📞 Getting Help

### Common Issues & Solutions

- Check [GitHub Issues](https://github.com/yourrepo/issues)
- Review project README.md
- Check console logs (F12 in browser)
- Check terminal output for errors

### Asking for Help

When reporting issues, include:

1. OS (Windows/Mac/Linux) and version
2. Node and Python versions
3. Full error message
4. Steps to reproduce
5. Screenshot if applicable

---

## 🔐 Security Tips

Before deploying to production:

1. ✅ Change MySQL default password
2. ✅ Use environment variables for secrets
3. ✅ Enable CORS only for your domain
4. ✅ Use HTTPS in production
5. ✅ Implement rate limiting
6. ✅ Add authentication if needed

---

## 📈 Next Steps

After successfully running the application:

1. **Explore the Code** - Review App.js and app.py
2. **Customize** - Add your own styling or features
3. **Deploy** - Share with others using cloud hosting
4. **Enhance** - Add database persistence, user auth, analytics
5. **Learn** - Study the code and improve your skills

---

**Congratulations!** 🎉 You now have a fully functional student grade prediction system running locally.

For updates and support, refer to README.md or contact the development team.

---

_Last Updated: January 2024_
_Version: 2.0_
