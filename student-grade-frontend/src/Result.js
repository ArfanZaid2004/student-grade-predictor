import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="result-page">
        <div className="result-card">
          <h2 className="page-title">No Prediction Found</h2>
          <p className="muted-text">
            Please go to the Predict page and select a student.
          </p>
          <button className="btn" onClick={() => navigate("/predict")}>
            Go to Predict
          </button>
        </div>
      </div>
    );
  }

  const confidencePercent = Math.round(state.confidence * 100);

  // UI logic
  let barColor = "#7f1d1d";
  let statusText = "At Risk";

  if (confidencePercent >= 80) {
    barColor = "#16a34a";
    statusText = "Excellent Performance";
  } else if (confidencePercent >= 50) {
    barColor = "#eab308";
    statusText = "Borderline Performance";
  }

  return (
    <div className="result-page">
      <div className="result-card">
        <h2 className="page-title">Prediction Result</h2>

        <span className="status-badge" style={{ backgroundColor: barColor }}>
          {statusText}
        </span>

        <div className="grade-box">
          <h1 style={{ color: barColor }}>{state.grade}</h1>
          <p>Predicted Grade</p>
        </div>

        <div className="info-row">
          <span>Student</span>
          <span>{state.student_name}</span>
        </div>

        <div className="confidence-section">
          <p className="section-label">Confidence Level</p>

          <div className="confidence-bar-bg">
            <div
              className="confidence-bar-fill"
              style={{
                width: `${confidencePercent}%`,
                backgroundColor: barColor,
              }}
            />
          </div>

          <p className="confidence-text" style={{ color: barColor }}>
            {confidencePercent}% confidence
          </p>
        </div>

        <div className="result-actions">
          <button
            className="btn secondary"
            onClick={() => navigate("/history")}
          >
            View History
          </button>
          <button className="btn" onClick={() => navigate("/predict")}>
            New Prediction
          </button>
        </div>
      </div>
    </div>
  );
}
