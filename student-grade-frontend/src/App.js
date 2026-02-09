import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import "./App.css";
import Predict from "./Predict";
import History from "./History";
import Result from "./Result";
import Toast from "./Toast";
import Login from "./Login";

const API = "http://localhost:5000";

/* ================= HEADER ================= */

function Header({ onLogout, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [open, setOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const username = user?.username || "User";
  const role = isAdmin ? "Administrator" : "User";
  const initial = username.charAt(0).toUpperCase();

  const logout = async () => {
    await fetch(`${API}/logout`, {
      method: "POST",
      credentials: "include",
    });
    onLogout();
  };

  // close dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".profile-wrapper")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/dashboard")}>
        GradePredict
      </div>

      <div className="nav-links">
        {isAdmin && (
          <span
            className={`nav-item ${path === "/dashboard" ? "active" : ""}`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </span>
        )}

        <span
          className={`nav-item ${path === "/add" ? "active" : ""}`}
          onClick={() => navigate("/add")}
        >
          Add
        </span>

        <span
          className={`nav-item ${path === "/predict" ? "active" : ""}`}
          onClick={() => navigate("/predict")}
        >
          Predict
        </span>

        {isAdmin && (
          <span
            className={`nav-item ${path === "/history" ? "active" : ""}`}
            onClick={() => navigate("/history")}
          >
            History
          </span>
        )}

        {/* PROFILE DROPDOWN */}
        <div className="profile-wrapper">
          <div
            className="profile-avatar"
            onClick={() => setOpen(!open)}
            tabIndex={0}
          >
            {initial}
          </div>

          {open && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <div className="profile-avatar large">{initial}</div>
                <div>
                  <div className="profile-name">{username}</div>
                  <div className="profile-role">{role}</div>
                </div>
              </div>

              <div className="profile-divider" />

              <div className="profile-item logout" onClick={logout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE WRAPPER ================= */

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);

  useEffect(() => {
    fetch(`${API}/dashboard-stats`, { credentials: "include" })
      .then((res) => res.json())
      .then(setStats);

    fetch(`${API}/dashboard-charts`, { credentials: "include" })
      .then((res) => res.json())
      .then(setCharts);
  }, []);

  if (!stats || !charts) {
    return (
      <div className="page">
        <div className="glass-card">Loading dashboard...</div>
      </div>
    );
  }

  const COLORS = {
    A: "#22c55e",
    B: "#84cc16",
    C: "#eab308",
    D: "#f97316",
    F: "#ef4444",
  };

  return (
    <div className="page">
      <div className="glass-card">
        <h2 className="page-title">Dashboard</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div className="action-box">
            <h3>{stats.total_students}</h3>
            <p>Total Students</p>
          </div>
          <div className="action-box">
            <h3>{stats.total_predictions}</h3>
            <p>Total Predictions</p>
          </div>
          <div className="action-box">
            <h3>{stats.average_confidence}%</h3>
            <p>Avg Confidence</p>
          </div>
          <div className="action-box">
            <h3>{stats.last_prediction_time}</h3>
            <p>Last Prediction</p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          <div className="action-box">
            <h3>Grade Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={charts.gradeDistribution}
                  dataKey="count"
                  nameKey="grade"
                  outerRadius={90}
                  label
                >
                  {charts.gradeDistribution.map((g) => (
                    <Cell key={g.grade} fill={COLORS[g.grade] || "#6b7280"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="action-box">
            <h3>Predictions Over Time</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={charts.timeline}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= ADD STUDENT (UNCHANGED) ================= */

function AddStudent() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [study, setStudy] = useState("");
  const [attendance, setAttendance] = useState("");
  const [participation, setParticipation] = useState("");
  const [toast, setToast] = useState(null);

  const nameRef = useRef(null);
  const studyRef = useRef(null);
  const attendanceRef = useRef(null);
  const participationRef = useRef(null);

  const addStudent = async () => {
    try {
      const res = await fetch(`${API}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          user_id: userId,
          name,
          study,
          attendance,
          participation,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add student");

      setToast({ message: "Student added successfully!", type: "success" });
      setUserId("");
      setName("");
      setStudy("");
      setAttendance("");
      setParticipation("");
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  return (
    <div className="page">
      <div className="glass-card">
        <h2 className="page-title">Add Student</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addStudent();
          }}
        >
          <input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                nameRef.current.focus();
              }
            }}
          />
          <input
            ref={nameRef}
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                studyRef.current.focus();
              }
            }}
          />
          <input
            ref={studyRef}
            placeholder="Weekly Study Hours"
            value={study}
            onChange={(e) => setStudy(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                attendanceRef.current.focus();
              }
            }}
          />
          <input
            ref={attendanceRef}
            placeholder="Attendance Percentage"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                participationRef.current.focus();
              }
            }}
          />
          <input
            ref={participationRef}
            placeholder="Class Participation"
            value={participation}
            onChange={(e) => setParticipation(e.target.value)}
          />

          <button className="btn" type="submit">
            Add Student
          </button>
        </form>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}

/* ================= MAIN APP ================= */

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch(`${API}/logout`, { method: "POST", credentials: "include" })
      .then(() => fetch(`${API}/check-auth`, { credentials: "include" }))
      .then(async (res) => {
        if (!res.ok) {
          setIsAuth(false);
          setUser(null);
          return;
        }
        const data = await res.json();
        setIsAuth(true);
        setUser(data.user || null);
      })
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        Checking authentication…
      </div>
    );
  }

  if (!isAuth) {
    return (
      <Login
        onLogin={(u) => {
          setIsAuth(true);
          setUser(u);
          if (u?.username) {
            setToast({ message: `Welcome, ${u.username}`, type: "success" });
          }
          if (u?.role === "admin") {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/add", { replace: true });
          }
        }}
      />
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="app">
      <Header
        user={user}
        onLogout={() => {
          setIsAuth(false);
          setUser(null);
          setToast(null);
        }}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/dashboard"
            element={
              <PageWrapper>
                {isAdmin ? <Dashboard /> : <Navigate to="/add" replace />}
              </PageWrapper>
            }
          />
          <Route
            path="/add"
            element={
              <PageWrapper>
                <AddStudent />
              </PageWrapper>
            }
          />
          <Route
            path="/predict"
            element={
              <PageWrapper>
                <Predict />
              </PageWrapper>
            }
          />
          <Route
            path="/history"
            element={
              <PageWrapper>
                {isAdmin ? <History /> : <Navigate to="/add" replace />}
              </PageWrapper>
            }
          />
          <Route
            path="/result"
            element={
              <PageWrapper>
                <Result />
              </PageWrapper>
            }
          />
          <Route
            path="*"
            element={
              <PageWrapper>
                {isAdmin ? <Dashboard /> : <AddStudent />}
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
