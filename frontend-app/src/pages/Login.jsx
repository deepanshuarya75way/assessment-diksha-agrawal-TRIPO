import React, { useState } from "react";
import axios from "axios";

const API =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:5000";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    if (
      !form.email.trim() ||
      !form.password
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/auth/login`,
        {
          email: form.email.trim(),
          password: form.password,
        }
      );

      if (res.data?.token) {
        localStorage.setItem(
          "token",
          res.data.token
        );

        if (res.data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
          );
        }

        alert("Login Successful 🎉");

        window.location.href = "/home";
      } else {
        alert(
          res.data?.message ||
            "Invalid Login"
        );
      }
    } catch (err) {
      console.error(
        "Login Error:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form
        style={styles.card}
        onSubmit={login}
      >
        <h1 style={styles.title}>
          TRIPO Login
        </h1>

        <p style={styles.subtitle}>
          Welcome Back Traveller
        </p>

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
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={changeHandler}
          autoComplete="current-password"
        />

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading
            ? "Please Wait..."
            : "Login"}
        </button>

        <p style={styles.text}>
          Don't have an account?
        </p>

        <button
          type="button"
          style={styles.register}
          onClick={() =>
            (window.location.href =
              "/register")
          }
        >
          Register
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
    background:
      "linear-gradient(135deg, #1e3a8a, #2563eb)",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "420px",
    maxWidth: "100%",
    background: "white",
    padding: "40px",
    borderRadius: "18px",
    boxShadow:
      "0 15px 40px rgba(0,0,0,.3)",
    boxSizing: "border-box",
  },

  title: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
    color: "#111827",
    background: "#ffffff",
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "bold",
  },

  text: {
    textAlign: "center",
    marginTop: "20px",
    color: "#555",
  },

  register: {
    width: "100%",
    marginTop: "12px",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#16a34a",
    color: "white",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "bold",
  },
};

export default Login;