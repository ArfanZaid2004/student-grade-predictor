import { useState, useRef, useEffect } from "react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);

  const passwordRef = useRef(null);
  const captchaRef = useRef(null);

  useEffect(() => {
    if (mode !== "login") {
      setCaptchaAnswer("");
    }
  }, [mode]);

  const loadCaptcha = async () => {
    try {
      const res = await fetch("http://localhost:5000/captcha", {
        credentials: "include",
      });
      const data = await res.json();
      setCaptchaQuestion(data.question || "");
    } catch {
      setCaptchaQuestion("");
    }
  };

  useEffect(() => {
    if (mode === "login") {
      loadCaptcha();
    }
  }, [mode]);

  const login = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!captchaAnswer) {
        setError("Please answer the captcha.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password, captcha_answer: captchaAnswer }),
      });

      const data = await res.json();

      if (res.ok) {
        const name = data?.user?.username || username || "User";
        setSuccess(`Welcome, ${name}`);
        setTimeout(() => onLogin(data.user || null), 400);
      } else {
        setError(data.error || "Login failed");
        setCaptchaAnswer("");
        loadCaptcha();
      }
    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created. You can log in now.");
        setMode("login");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* BRAND */}
      <div className="login-brand">GradePredict</div>

      <div className="login-card">
        <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (allowSubmit) {
              if (mode === "login") login();
              else register();
            }
          }}
        >
          {/* USERNAME */}
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setAllowSubmit(false);
                passwordRef.current.focus();
              }
            }}
          />

          {/* PASSWORD */}
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setAllowSubmit(false);
                if (mode === "login" && captchaRef.current) {
                  captchaRef.current.focus();
                }
              }
            }}
          />

          {mode === "register" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setAllowSubmit(true);
                }
              }}
            />
          )}

          {mode === "login" && (
            <div className="captcha-row">
              <span className="captcha-question">
                {captchaQuestion || "Loading captcha..."}
              </span>
              <input
                className="captcha-input"
                placeholder="Answer"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                ref={captchaRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setAllowSubmit(true);
                  }
                }}
              />
              <button
                type="button"
                className="captcha-refresh"
                onClick={loadCaptcha}
                title="Refresh captcha"
              >
                ↻
              </button>
            </div>
          )}

          {error && <p className="login-error">{error}</p>}
          {success && <p className="login-success">{success}</p>}

          <button
            type="submit"
            className="btn"
            disabled={loading}
            onClick={() => setAllowSubmit(true)}
          >
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        <div className="login-switch">
          {mode === "login" ? (
            <span>
              New here?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                  setSuccess("");
                }}
              >
                Create account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
              >
                Sign in
              </button>
            </span>
          )}
        </div>

        <p className="login-hint">Use your account credentials</p>
      </div>
    </div>
  );
}
