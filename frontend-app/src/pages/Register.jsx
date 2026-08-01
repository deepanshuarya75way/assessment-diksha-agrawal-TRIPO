import React, { useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5000";

  console.log("API =", API);

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert(
        "Please enter a valid email address.\nExample: prince1220@gmail.com"
      );
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      alert(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    if (password.length < 6) {
      alert(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Register API:",
        `${API}/api/auth/register`
      );

      const res = await axios.post(
        `${API}/api/auth/register`,
        {
          name,
          email,
          phone,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Registration response:",
        res.data
      );

      if (res.data.success || res.data.token) {
        alert(
          "Registration Successful 🎉\nPlease login to continue."
        );

        window.location.href = "/login";
      } else {
        alert(
          res.data.message ||
            "Registration Failed"
        );
      }
    } catch (err) {
      console.error(
        "Registration Error:",
        err.response?.data || err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration Failed. Please check your backend server.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form
        style={styles.card}
        onSubmit={register}
      >
        <h1 style={styles.title}>
          Create TRIPO Account
        </h1>

        <p style={styles.subtitle}>
          Join India's Smart Travel Platform
        </p>

        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={changeHandler}
          autoComplete="name"
        />

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={changeHandler}
          autoComplete="email"
        />

        <input
          style={styles.input}
          type="tel"
          name="phone"
          placeholder="10-digit Mobile Number"
          value={form.phone}
          onChange={changeHandler}
          maxLength="10"
          autoComplete="tel"
        />

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={changeHandler}
          autoComplete="new-password"
        />

        <input
          style={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={changeHandler}
          autoComplete="new-password"
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
            ? "Creating Account..."
            : "Register"}
        </button>

        <p style={styles.text}>
          Already have an account?
        </p>

        <button
          type="button"
          style={styles.login}
          onClick={() => {
            window.location.href =
              "/login";
          }}
        >
          Login
        </button>
      </form>
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

    /* ONLY CHANGE: Navbar-style blue background */
    background:
      "linear-gradient(135deg, #1e3a8a, #2563eb)",
  },

  card: {
    width: "100%",
    maxWidth: "610px",
    background: "white",
    padding: "40px",
    borderRadius: "18px",
    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.3)",
    boxSizing: "border-box",
  },

  title: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "10px",
    fontSize: "42px",
  },

  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: "30px",
    fontSize: "20px",
  },

  input: {
    width: "100%",
    padding: "15px 20px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "18px",
    boxSizing: "border-box",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    background: "#16a34a",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
  },

  text: {
    textAlign: "center",
    marginTop: "25px",
    marginBottom: "10px",
    color: "#555",
    fontSize: "18px",
  },

  login: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default Register;