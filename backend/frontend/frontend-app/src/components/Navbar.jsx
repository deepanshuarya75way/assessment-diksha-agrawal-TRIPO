import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>✈️ TRIPO</h2>

      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/budget" style={styles.link}>AI Budget</Link>
        <Link to="/chat" style={styles.link}>Assistant</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "linear-gradient(90deg,#0f172a,#1e293b)",
    color: "white"
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold"
  },
  link: {
    margin: "0 10px",
    color: "white",
    textDecoration: "none"
  }
};

export default Navbar;