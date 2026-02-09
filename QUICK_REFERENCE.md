# ⚡ Quick Reference - Student Grade Prediction System

## 🚀 Quick Start (5 minutes)

### Terminal 1 - Backend

```bash
cd Student_predicts_Flask
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Visit: http://localhost:5000

### Terminal 2 - Frontend

```bash
cd student-grade-frontend
npm install
npm start
```

Visit: http://localhost:3000

---

## 📋 API Endpoints Quick Reference

| Method | Endpoint         | Purpose              | Response                |
| ------ | ---------------- | -------------------- | ----------------------- |
| GET    | `/health`        | Health check         | `{"status": "healthy"}` |
| GET    | `/students`      | List all students    | `[{student}...]`        |
| POST   | `/students`      | Add new student      | `{id, message}` (201)   |
| GET    | `/students/<id>` | Get specific student | `{student}`             |
| GET    | `/predict/<id>`  | Predict grade        | `{score, grade}`        |
| DELETE | `/students/<id>` | Delete student       | `{message}`             |

---

## 🎨 Color Palette

| Name       | Color       | Hex     | Usage               |
| ---------- | ----------- | ------- | ------------------- |
| Primary    | 🟣 Purple   | #667eea | Main gradient start |
| Secondary  | 🩷 Pink     | #764ba2 | Main gradient end   |
| Accent     | 💗 Hot Pink | #f093fb | Highlights          |
| Success    | 💚 Green    | #10b981 | Predict button      |
| Danger     | ❤️ Red      | #ef4444 | Delete button       |
| Text Light | ⚪ Light    | #e5e7eb | Dark mode text      |
| Text Dark  | ⚫ Dark     | #6b7280 | Light mode text     |

---

## ⌨️ Keyboard Shortcuts

| Action           | Windows           | macOS            |
| ---------------- | ----------------- | ---------------- |
| Open DevTools    | F12               | Cmd+Option+I     |
| Reload           | Ctrl+R            | Cmd+R            |
| Hard Reload      | Ctrl+Shift+R      | Cmd+Shift+R      |
| Clear Cache      | Ctrl+Shift+Delete | Cmd+Shift+Delete |
| Debug Breakpoint | F10               | F10              |
| Step Into        | F11               | F11              |

---

## 📁 File Editing Quick Guide

### Update Frontend Styling

**File**: `student-grade-frontend/src/App.css`

```css
/* Change primary color */
background: linear-gradient(135deg, #YourColor1, #YourColor2);

/* Change button style */
.button-class {
  background: linear-gradient(...);
  border-radius: 50px;
  padding: 14px 32px;
}
```

### Update Frontend Logic

**File**: `student-grade-frontend/src/App.js`

```javascript
// Change API endpoint
const response = await fetch("http://localhost:5000/students", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

### Update Backend Logic

**File**: `app.py`

```python
@app.route('/students', methods=['POST'])
def add_student():
    # Modify validation
    if not data.get('user_id'):
        return jsonify({"error": "..."}), 400

    # Process and return
    return jsonify({...}), 201
```

---

## 🔧 Common Commands

### Node/React

```bash
npm install              # Install dependencies
npm start                # Start dev server
npm build                # Create production build
npm test                 # Run tests
npm audit                # Check security issues
npm uninstall package    # Remove package
```

### Python/Flask

```bash
python -m venv venv      # Create virtual environment
venv\Scripts\activate    # Activate venv (Windows)
source venv/bin/activate # Activate venv (Mac/Linux)
pip install -r requirements.txt  # Install dependencies
pip freeze > requirements.txt    # Update requirements
python app.py            # Run Flask server
python -m pytest         # Run tests
```

### Database

```bash
mysql -u root -p         # Connect to MySQL
SHOW DATABASES;          # List all databases
USE student_grades;      # Select database
SHOW TABLES;             # List tables
SELECT * FROM students;  # View all students
DROP DATABASE student_grades;  # Delete database
```

### Git

```bash
git init                 # Initialize repo
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push origin main     # Push to remote
git log                  # View commit history
```

---

## 🐛 Troubleshooting Cheat Sheet

| Problem                   | Cause                  | Solution                             |
| ------------------------- | ---------------------- | ------------------------------------ |
| Port 3000 in use          | Another app running    | `lsof -i :3000` then `kill -9 <PID>` |
| Port 5000 in use          | Another Flask app      | `lsof -i :5000` then kill            |
| "Cannot find module"      | Missing npm packages   | `npm install`                        |
| "ModuleNotFoundError"     | Missing Python package | `pip install package_name`           |
| Database connection error | MySQL not running      | Start MySQL service                  |
| CORS error                | Backend not accessible | Check backend running on :5000       |
| Blank page on reload      | localStorage issue     | Clear browser cache                  |
| Slow animations           | GPU not used           | Check CSS for performance            |
| API returns 400           | Invalid input          | Check form validation                |
| API returns 500           | Server error           | Check backend logs                   |

---

## 📊 Database Quick Reference

### Check Database Status

```sql
-- Show all databases
SHOW DATABASES;

-- Check current database
SELECT DATABASE();

-- View students table
SELECT * FROM students;

-- Count total students
SELECT COUNT(*) FROM students;

-- View recent students
SELECT * FROM students ORDER BY created_at DESC LIMIT 10;

-- Find student by ID
SELECT * FROM students WHERE id = 1;

-- Find student by user_id
SELECT * FROM students WHERE user_id = 'U001';

-- Check predictions
SELECT id, predicted_grade, predicted_score FROM students WHERE predicted_grade IS NOT NULL;
```

---

## 📈 Performance Metrics

### Target Metrics

- Page load: < 2 seconds
- API response: < 500ms
- First paint: < 1 second
- Animation FPS: 60fps
- Bundle size: < 200KB (gzipped)

### Check Performance

```javascript
// In browser console
console.time("operation");
// ... do something ...
console.timeEnd("operation"); // Shows elapsed time

// Measure API response
const start = Date.now();
await fetch("/students");
const duration = Date.now() - start;
console.log(`API took ${duration}ms`);
```

---

## 🔐 Environment Variables

### Required Variables

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DB=student_grades
```

### Optional Variables

```
FLASK_ENV=development
LOG_LEVEL=INFO
SECRET_KEY=your-secret
```

### Set Environment Variables

#### Windows PowerShell

```powershell
$env:MYSQL_HOST="localhost"
$env:MYSQL_USER="root"
```

#### Windows CMD

```cmd
set MYSQL_HOST=localhost
set MYSQL_USER=root
```

#### Mac/Linux

```bash
export MYSQL_HOST=localhost
export MYSQL_USER=root
```

---

## 📚 Documentation Files

| File             | Purpose              | Details                           |
| ---------------- | -------------------- | --------------------------------- |
| README.md        | Project overview     | Features, installation, usage     |
| SETUP_GUIDE.md   | Installation steps   | Step-by-step setup instructions   |
| DEVELOPMENT.md   | Developer guide      | Architecture, workflow, debugging |
| .env.example     | Environment template | Copy to .env and configure        |
| requirements.txt | Python dependencies  | pip install -r requirements.txt   |
| TODO.md          | Completion status    | Track project progress            |

---

## 🌐 Important URLs

| Service         | URL                   | Port  |
| --------------- | --------------------- | ----- |
| React App       | http://localhost:3000 | 3000  |
| Flask Backend   | http://localhost:5000 | 5000  |
| MySQL           | localhost             | 3306  |
| MySQL Workbench | -                     | Local |

---

## 🎯 Common Modifications

### Change Primary Color

1. Open `App.css`
2. Find `linear-gradient(135deg, #667eea, #764ba2)`
3. Replace with your colors
4. Update in `Result.css` too

### Add New Form Field

1. Add to state in `App.js`: `const [fieldName, setFieldName] = useState('')`
2. Add input element in JSX
3. Add to API call data
4. Add validation in `addStudent()`
5. Update backend validation

### Add New API Endpoint

1. Create route in `app.py`: `@app.route('/endpoint', methods=['GET'])`
2. Add error handling with try-except
3. Return JSON with proper status code
4. Call from React using fetch()
5. Update API documentation

### Customize Styling

1. Modify CSS in `App.css` or `Result.css`
2. Use existing color variables
3. Keep consistent spacing (8px base unit)
4. Test at 768px breakpoint for mobile
5. Maintain glass-morphism aesthetic

---

## ✅ Pre-Deployment Checklist

- [ ] All npm packages up to date: `npm audit`
- [ ] All Python packages up to date: `pip list --outdated`
- [ ] No console errors in browser (F12)
- [ ] No errors in backend terminal
- [ ] Database has test data
- [ ] Predictions working correctly
- [ ] Theme toggle persists
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] No hardcoded localhost URLs
- [ ] Environment variables configured
- [ ] Production build created: `npm run build`
- [ ] .env file not committed to git
- [ ] CORS configured for production URL
- [ ] Database backups ready

---

## 🚀 One-Click Startup (PowerShell)

Save as `start.ps1`:

```powershell
# Start backend
$backend = Start-Process powershell -ArgumentList "cd Student_predicts_Flask; venv\Scripts\activate; python app.py"

# Start frontend
$frontend = Start-Process powershell -ArgumentList "cd student-grade-frontend; npm start"

Write-Host "Backend PID: $($backend.Id)"
Write-Host "Frontend PID: $($frontend.Id)"
Write-Host "Backend: http://localhost:5000"
Write-Host "Frontend: http://localhost:3000"
```

Run with: `.\start.ps1`

---

## 📞 Getting Help

### Check These First

1. Read the error message carefully
2. Check browser console (F12)
3. Check terminal output
4. Search error in README.md
5. Check DEVELOPMENT.md troubleshooting section

### Provide Info When Asking for Help

- OS and version
- Python version (`python --version`)
- Node version (`node --version`)
- Full error message
- Steps to reproduce
- Screenshot if applicable

---

**Last Updated**: January 2024
**Quick Reference Version**: 2.0
**Status**: ✅ Complete
