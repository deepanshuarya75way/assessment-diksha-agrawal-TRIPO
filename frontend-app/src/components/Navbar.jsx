import React from "react";

const Navbar = ({
  search,
  setSearch,
  user,
  onLogout,
}) => {
  return (
    <nav style={styles.navbar}>
      {/* TRIPO LOGO */}
      <div style={styles.logo}>
        <img
          src="/tripo-logo.jpeg"
          alt="TRIPO"
          style={styles.logoImage}
        />
      </div>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search State, City, Destination..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.input}
        />
      </div>

      <div style={styles.links}>
        <a href="/">Home</a>

        <a href="/about">About</a>

        <a href="/contact">Contact</a>

        <a href="/partner">Partner</a>

        {/* FEEDBACK */}
        <a
          href="/feedback"
          style={styles.feedback}
        >
          Feedback
        </a>

        {user ? (
          <>
            <span style={styles.user}>
              👋 {user.name || user.email}
            </span>

            <button
              style={styles.logout}
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login">
              <button style={styles.login}>
                Login
              </button>
            </a>

            <a href="/register">
              <button style={styles.register}>
                Register
              </button>
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    background:
      "linear-gradient(90deg,#1e3a8a,#2563eb)",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    flexWrap: "wrap",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    boxShadow: "none",
  },

  logoImage: {
    width: "145px",
    height: "70px",
    objectFit: "contain",
    display: "block",
    background: "transparent",
    border: "none",
    boxShadow: "none",
  },

  searchBox: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },

  input: {
    width: "420px",
    maxWidth: "100%",
    padding: "12px 18px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
    fontSize: "15px",
  },

  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  user: {
    fontWeight: "bold",
  },

  /* ONLY ADDED FOR FEEDBACK */
  feedback: {
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "500",
  },

  login: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  register: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;