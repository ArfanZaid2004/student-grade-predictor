# 📊 Student Grade Prediction System

A modern, professional web application for predicting student grades based on study hours, attendance, and class participation. Built with React, Flask, and Machine Learning.

![Version](https://img.shields.io/badge/version-2.0-blue)
![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 User Interface

- **Dark/Light Theme Toggle** - Seamless theme switching with localStorage persistence
- **Professional Design** - Glass-morphism effects with modern gradients
- **Smooth Animations** - 60fps animations for user interactions
- **Responsive Layout** - Mobile-first design working on all screen sizes
- **Real-time Search** - Filter students by name or ID instantly
- **Visual Feedback** - Loading states, success messages, and error alerts
- <img width="644" height="502" alt="Image" src="https://github.com/user-attachments/assets/2c73eab2-5b55-4dcf-8cb4-658098828ec4" />

### 📈 Student Management
- **Role Based Login**- Admin and user
- <img width="505" height="213" alt="Image" src="https://github.com/user-attachments/assets/7d51ef67-95e2-47b1-8051-98537bf6208d" />
- <img width="291" height="151" alt="Image" src="https://github.com/user-attachments/assets/ccb31f03-bd1c-40a4-9e72-3ad8be5317c4" />

- **Add Students** - Form validation with helpful error messages
- <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/66bac9e4-8f88-4049-850e-94181d491efe" />
- **View Records** - Organized table with sortable columns
- <img width="946" height="520" alt="Image" src="https://github.com/user-attachments/assets/8aa3c03c-6cb0-454f-ab65-aaa39fdfac00" />
- **Predict Grades** - ML-based grade prediction
- <img width="954" height="547" alt="Image" src="https://github.com/user-attachments/assets/e12c3d8c-f729-409f-b03a-a50a558aff96" />
- **Delete Records** - Confirmation dialogs to prevent accidents
- <img width="920" height="444" alt="Image" src="https://github.com/user-attachments/assets/9f1e3939-6b39-40b0-940f-768cd600df4a" />
- **Grade Badges** - Color-coded grade indicators (A, B, C, D)
- <img width="520" height="494" alt="Image" src="https://github.com/user-attachments/assets/b5ee4368-fd57-4994-95d5-3050e290479d" />

### 🤖 Machine Learning

- **Intelligent Predictions** - ML model trained on student performance data
- **Grade Assignment** - Automatic grade calculation based on score
- **Cached Results** - Efficient prediction storage and retrieval
- **Score Calculation** - Weighted algorithm considering all factors

### 🔒 Backend Features

- **Error Handling** - Comprehensive try-catch blocks with descriptive messages
- **Data Validation** - Input validation at API level
- **Logging** - Structured logging for debugging and monitoring
- **Health Check** - GET /health endpoint for system monitoring
- **CORS Support** - Secure cross-origin requests

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ and npm
- Python 3.8+
- MySQL 5.7+
- Git

### Installation

#### 1. Clone Repository

```bash
git clone <repository-url>
cd Student_predicts_Flask
```

#### 2. Setup Backend

```bash
# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install flask flask-cors flask-sqlalchemy pymysql scikit-learn numpy pandas

# Create .env file for database configuration
echo MYSQL_HOST=localhost > .env
echo MYSQL_USER=root >> .env
echo MYSQL_PASSWORD=your_password >> .env
echo MYSQL_DB=student_grades >> .env
```

#### 3. Setup Frontend

```bash
cd student-grade-frontend

# Install Node dependencies
npm install

# Start development server
npm start
```

The app will open at http://localhost:3000

#### 4. Start Backend

```bash
# From project root (with venv activated)
python app.py
```

Backend runs at http://localhost:5000

## 📁 Project Structure

```
Student_predicts_Flask/
├── app.py                          # Flask backend application
├── clean.py                        # Data cleaning utility
├── students_data.csv              # Sample student data
├── models/                        # ML models directory
│   └── [trained models]
├── static/                        # Static assets
│   └── style.css
├── templates/                     # Flask templates (legacy)
│   ├── index.html
│   └── result.html
├── student-grade-frontend/        # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js                # Main component
│       ├── App.css               # App styling
│       ├── Result.js             # Results page
│       ├── Result.css            # Results styling
│       └── index.js              # React entry point
└── README.md                      # This file
```

## 🎯 API Endpoints

### GET /health

Health check endpoint

```
Status: 200 OK
Response: {"status": "healthy"}
```

### GET /students

Get all students with pagination

```
Status: 200 OK
Response: [
  {
    "id": 1,
    "user_id": "U001",
    "name": "John Doe",
    "weekly_self_study_hours": 5.5,
    "attendance_percentage": 85,
    "class_participation": 8,
    "created_at": "2024-01-15T10:30:00",
    "predicted_grade": "A",
    "predicted_score": 92
  },
  ...
]
```

### POST /students

Add new student

```
Request:
{
  "user_id": "U001",
  "name": "John Doe",
  "weekly_self_study_hours": 5.5,
  "attendance_percentage": 85,
  "class_participation": 8
}

Status: 201 Created
Response: {
  "id": 1,
  "message": "Student added successfully"
}
```

### GET /students/<id>

Get specific student

```
Status: 200 OK
Response: {student object}
```

### GET /predict/<id>

Predict student grade

```
Status: 200 OK
Response: {
  "student_id": 1,
  "student_name": "John Doe",
  "score": 92,
  "grade": "A",
  "message": "Excellent performance!"
}
```

### DELETE /students/<id>

Delete student record

```
Status: 200 OK
Response: {"message": "Student deleted successfully"}
```

## 🎨 Design System

### Color Palette

- **Primary Gradient**: #667eea → #764ba2 (Purple to Pink)
- **Secondary**: #f093fb (Pink accent)
- **Dark Mode BG**: #0f0f1e (Deep Navy)
- **Text Light**: #e5e7eb (Light Gray)
- **Text Dark**: #6b7280 (Medium Gray)

### Typography

- **Font Family**: Segoe UI, sans-serif
- **Heading**: 32px, bold (H1), 24px (H2)
- **Body**: 16px regular
- **Small**: 14px, 13px

### Spacing

- **Base Unit**: 8px
- **Padding**: 20px (default), 50px (large)
- **Gap**: 15px, 20px, 30px

### Animations

- **Fade In**: 0.6s ease-in
- **Slide Up**: 0.8s ease-out
- **Scale In**: 0.7s ease-out
- **Bounce**: 0.6s cubic-bezier
- **Hover**: 0.3s ease

## 🔐 Validation Rules

### Input Validation

- **Study Hours**: 0-40 hours (optional, defaults to 0)
- **Attendance**: 0-100% (required)
- **Participation**: 0-10 scale (required)
- **User ID**: String (max 50 chars, required)
- **Name**: String (max 100 chars, optional)

### Grade Assignment Logic

- **A**: Score ≥ 90
- **B**: Score 80-89
- **C**: Score 70-79
- **D**: Score 60-69
- **F**: Score < 60

## 🧪 Testing

### Manual Testing Checklist

#### Frontend

- [ ] Theme toggle works and persists on reload
- [ ] Form validation shows error messages
- [ ] Loading state displays during API calls
- [ ] Success notification auto-dismisses after 3s
- [ ] Search filters students correctly
- [ ] Delete confirmation dialog appears
- [ ] Animations load smoothly
- [ ] Mobile responsive on small screens

#### Backend

- [ ] GET /health returns 200
- [ ] POST /students with valid data returns 201
- [ ] POST /students with invalid data returns 400
- [ ] GET /predict/<id> returns correct grade
- [ ] DELETE /students/<id> returns 200
- [ ] Non-existent IDs return 404

### Performance

- Page load: < 2s
- API response: < 500ms
- Animation frame rate: 60fps

## 📊 Sample Data

```csv
user_id,name,weekly_self_study_hours,attendance_percentage,class_participation
U001,John Doe,5.5,85,8
U002,Jane Smith,7.0,92,9
U003,Bob Johnson,3.5,75,6
```

## 🛠️ Development

### Available Scripts

#### Frontend

```bash
npm start          # Run development server
npm build          # Create production build
npm test           # Run tests
npm eject          # Eject from Create React App
```

#### Backend

```bash
python app.py      # Run Flask server
python clean.py    # Clean/process data
```

## 📦 Dependencies

### Frontend

```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0"
}
```

### Backend

```
Flask==2.3.0
Flask-CORS==4.0.0
Flask-SQLAlchemy==3.0.0
PyMySQL==1.1.0
scikit-learn==1.2.0
numpy==1.24.0
pandas==2.0.0
```

## 🚀 Deployment

### Production Build (Frontend)

```bash
cd student-grade-frontend
npm run build
# Output in build/ directory
```

### Environment Variables

Create `.env` file in project root:

```
FLASK_ENV=production
MYSQL_HOST=your-db-host
MYSQL_USER=your-db-user
MYSQL_PASSWORD=your-db-password
MYSQL_DB=student_grades
SECRET_KEY=your-secret-key
```

### Docker (Optional)

```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app.py .
CMD ["python", "app.py"]
```

## 📈 Performance Optimization

### Frontend

- CSS minification
- Code splitting
- Image optimization
- Lazy loading

### Backend

- Database indexing
- Query optimization
- Response caching
- Connection pooling

## 🐛 Troubleshooting

### "Cannot GET /"

- Ensure React development server is running on port 3000
- Check that npm install completed successfully

### "Connection refused" (Backend)

- Ensure Flask is running on port 5000
- Check MySQL connection parameters in .env

### "Module not found" errors

- Run `npm install` in student-grade-frontend
- Activate Python virtual environment for backend

### CORS errors

- Flask CORS is enabled by default
- Check backend is running before frontend

## 📚 Documentation

- [React Documentation](https://react.dev)
- [Flask Documentation](https://flask.palletsprojects.com)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org)
- [scikit-learn ML](https://scikit-learn.org)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Flask and React communities
- scikit-learn for ML algorithms
- Icons and assets from design community

## 📧 Support

For support, email support@example.com or open an issue on GitHub.

---

**Last Updated**: January 2024
**Version**: 2.0 (Production Ready)
**Status**: ✅ All Features Complete
