import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const API = "http://localhost:5000";

export default function Predict() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({
    user_id: "",
    name: "",
    study: "",
    attendance: "",
    participation: "",
  });

  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    fetch(`${API}/students`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
          setFiltered(data);
        } else {
          setStudents([]);
          setFiltered([]);
        }
      })
      .catch(() => {
        setStudents([]);
        setFiltered([]);
      });
  };

  useEffect(() => {
    const value = search.toLowerCase();
    setFiltered(
      students.filter(
        (s) =>
          s.name.toLowerCase().includes(value) ||
          s.user_id.toLowerCase().includes(value),
      ),
    );
  }, [search, students]);

  // 🔥 FIXED PREDICT FUNCTION
  const predict = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/predict/${id}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || "Prediction failed");
      }

      setLoading(false);
      navigate("/result", { state: data });
    } catch (err) {
      setLoading(false);
      setToast({
        message: err.message,
        type: "error",
      });
    }
  };

  const startEdit = (student) => {
    setEditing(student.id);
    setEditData({
      user_id: student.user_id,
      name: student.name,
      study: student.weekly_self_study_hours,
      attendance: student.attendance_percentage,
      participation: student.class_participation,
    });
  };

  const saveEdit = () => {
    fetch(`${API}/students/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(editData),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setEditing(null);
        loadStudents();
        setToast({ message: "Student updated successfully!", type: "success" });
      })
      .catch(() => {
        setToast({ message: "Update failed", type: "error" });
      });
  };

  const deleteStudent = (id) => {
    fetch(`${API}/students/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        loadStudents();
        setToast({ message: "Student deleted successfully!", type: "warning" });
      })
      .catch(() => {
        setToast({ message: "Delete failed", type: "error" });
      });
  };

  return (
    <div className="page">
      <div className="glass-card">
        <h2 className="page-title">Predict / Manage Students</h2>

        <input
          placeholder="Search by Name or User ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        {loading && (
          <div className="loader">
            <div className="spinner"></div>
            <p>Analyzing...</p>
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <p style={{ color: "#9ca3af", textAlign: "center" }}>
            No matching students found.
          </p>
        )}

        {filtered.length > 0 && !loading && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.user_id}</td>
                  <td>{s.name}</td>
                  <td>
                    <button className="btn" onClick={() => predict(s.id)}>
                      Predict
                    </button>{" "}
                    <button
                      className="btn"
                      style={{ background: "#374151" }}
                      onClick={() => startEdit(s)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn"
                      style={{ background: "#7f1d1d" }}
                      onClick={() => deleteStudent(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {editing && (
          <div style={{ marginTop: "25px" }}>
            <h3>Edit Student</h3>

            <input
              placeholder="User ID"
              value={editData.user_id}
              onChange={(e) =>
                setEditData({ ...editData, user_id: e.target.value })
              }
            />
            <input
              placeholder="Name"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <input
              placeholder="Study Hours"
              value={editData.study}
              onChange={(e) =>
                setEditData({ ...editData, study: e.target.value })
              }
            />
            <input
              placeholder="Attendance %"
              value={editData.attendance}
              onChange={(e) =>
                setEditData({ ...editData, attendance: e.target.value })
              }
            />
            <input
              placeholder="Participation"
              value={editData.participation}
              onChange={(e) =>
                setEditData({ ...editData, participation: e.target.value })
              }
            />

            <button className="btn" onClick={saveEdit}>
              Save
            </button>
            <button
              className="btn"
              style={{ background: "#374151", marginLeft: "10px" }}
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        )}

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
