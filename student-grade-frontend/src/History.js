import { useEffect, useState } from "react";

const API = "http://localhost:5000";

export default function History() {
  const [history, setHistory] = useState([]);
  const [grade, setGrade] = useState("ALL");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (grade !== "ALL") params.append("grade", grade);
    if (start) params.append("start", start);
    if (end) params.append("end", end);

    const res = await fetch(`${API}/history?${params.toString()}`, {
      credentials: "include",
    });

    const data = await res.json();
    setHistory(data);
    setLoading(false);
  };

  const resetFilters = () => {
    setGrade("ALL");
    setStart("");
    setEnd("");
    fetchHistory();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="page">
      <div className="glass-card">
        <h2 className="page-title">Prediction History</h2>

        {/* FILTERS */}
        <div className="history-filters">
          {/* ONE LINE */}
          <div className="history-filter-row">
            <div className="filter-field">
              <label className="filter-label">Grade</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value="ALL">All</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </div>

            <div className="filter-field">
              <label className="filter-label">From Date</label>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>

            <div className="filter-field">
              <label className="filter-label">To Date</label>
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>

          {/* BUTTONS BELOW */}
          <div className="filter-actions">
            <button className="btn btn-small" onClick={fetchHistory}>
              Apply
            </button>
            <button className="btn btn-small" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="loader">Loading history...</div>
        ) : history.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No records found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Grade</th>
                <th>Confidence</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td>{h.student_name}</td>
                  <td>{h.grade}</td>
                  <td>{Math.round(h.confidence * 100)}%</td>
                  <td>{new Date(h.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
