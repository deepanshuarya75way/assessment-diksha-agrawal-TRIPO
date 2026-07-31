import React, { useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5000";

function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.rating ||
      !form.message.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/feedback`,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          rating: Number(form.rating),
          message: form.message.trim(),
        }
      );

      if (res.data?.success) {
        setSubmitted(true);

        setForm({
          name: "",
          email: "",
          rating: "",
          message: "",
        });
      } else {
        alert(
          res.data?.message ||
            "Feedback submission failed."
        );
      }
    } catch (error) {
      console.error(
        "Feedback Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Unable to submit feedback. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          TRIPO Feedback
        </h1>

        <p style={styles.subtitle}>
          We would love to hear your experience with TRIPO
        </p>

        {submitted ? (
          <div style={styles.successBox}>
            <div style={styles.successIcon}>
              ✓
            </div>

            <h2 style={styles.successTitle}>
              Thank You! 🎉
            </h2>

            <p style={styles.successText}>
              Your feedback has been submitted
              successfully.
              <br />
              It helps us make TRIPO better for
              every traveller.
            </p>

            <button
              style={styles.homeButton}
              onClick={() => {
                window.location.href = "/home";
              }}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={submitFeedback}>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={changeHandler}
            />

            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={changeHandler}
            />

            <select
              style={styles.input}
              name="rating"
              value={form.rating}
              onChange={changeHandler}
            >
              <option value="">
                Rate your experience
              </option>

              <option value="5">
                ⭐⭐⭐⭐⭐ Excellent
              </option>

              <option value="4">
                ⭐⭐⭐⭐ Very Good
              </option>

              <option value="3">
                ⭐⭐⭐ Good
              </option>

              <option value="2">
                ⭐⭐ Average
              </option>

              <option value="1">
                ⭐ Poor
              </option>
            </select>

            <textarea
              style={styles.textarea}
              name="message"
              placeholder="Tell us about your experience with TRIPO..."
              value={form.message}
              onChange={changeHandler}
              rows="6"
            />

            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Feedback"}
            </button>

            <button
              type="button"
              style={styles.backButton}
              onClick={() => {
                window.location.href = "/home";
              }}
            >
              Back to Home
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 15px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #141e30, #243b55)",
  },

  card: {
    width: "100%",
    maxWidth: "600px",
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.3)",
    boxSizing: "border-box",
  },

  title: {
    textAlign: "center",
    color: "#2563eb",
    fontSize: "38px",
    margin: "0 0 10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: "18px",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "15px 18px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "17px",
    boxSizing: "border-box",
    outline: "none",
    background: "#ffffff",
    color: "#111827",
  },

  textarea: {
    width: "100%",
    padding: "15px 18px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "17px",
    boxSizing: "border-box",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    color: "#111827",
    background: "#ffffff",
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
  },

  backButton: {
    width: "100%",
    marginTop: "12px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#64748b",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  successBox: {
    textAlign: "center",
    padding: "20px 10px",
  },

  successIcon: {
    width: "70px",
    height: "70px",
    margin: "0 auto 15px",
    borderRadius: "50%",
    background: "#16a34a",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "42px",
    fontWeight: "bold",
  },

  successTitle: {
    color: "#16a34a",
    fontSize: "30px",
    margin: "10px 0",
  },

  successText: {
    color: "#555",
    fontSize: "17px",
    lineHeight: "1.6",
    marginBottom: "25px",
  },

  homeButton: {
    padding: "14px 30px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "bold",
  },
};

export default Feedback;