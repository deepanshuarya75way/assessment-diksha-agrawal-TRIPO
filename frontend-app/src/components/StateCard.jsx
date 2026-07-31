import React from "react";
import WeatherCard from "./WeatherCard";

function StateCard({ state, onExplore, onBook }) {

  const handleBooking = () => {

    const token = localStorage.getItem("token");

    if (!token) {

      alert("Please Login First");

      window.location.href = "/login";

      return;

    }

    onBook(state);

  };

  return (

    <div style={styles.card}>

      <img
        src={
          state.image ||
          `https://source.unsplash.com/600x400/?${encodeURIComponent(
            state.name
          )},india`
        }
        alt={state.name}
        style={styles.image}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da";
        }}
      />

      <div style={styles.body}>

        <h2 style={styles.title}>
          🇮🇳 {state.name}
        </h2>

        <p style={styles.capital}>
          <b>Capital :</b> {state.capital || "Coming Soon"}
        </p>

        <WeatherCard city={state.capital || "Delhi"} />

        <p style={styles.description}>
          {state.description ||
            `Explore the beautiful tourist places of ${state.name} with TRIPO. Book hotels, discover restaurants, get live weather and AI travel guidance.`}
        </p>

        <div style={styles.buttonGroup}>

          <button
            style={styles.blueButton}
            onClick={() => onExplore(state)}
          >
            🌍 Explore {state.name}
          </button>

          <button
            style={styles.greenButton}
            onClick={handleBooking}
          >
            🏨 Book Trip
          </button>

          <button
            style={styles.orangeButton}
            onClick={() =>
              window.open(
                `https://www.google.com/search?q=${encodeURIComponent(
                  state.name
                )}+best+restaurants`,
                "_blank"
              )
            }
          >
            🍴 Restaurants
          </button>

        </div>

      </div>

    </div>

  );

}

const styles = {

  card: {
    background: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,.25)"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },

  body: {
    padding: "20px"
  },

  title: {
    fontSize: "28px",
    color: "#1e3a8a",
    marginBottom: "10px"
  },

  capital: {
    fontSize: "17px",
    marginBottom: "15px"
  },

  description: {
    fontSize: "16px",
    color: "#444",
    lineHeight: "28px",
    marginTop: "15px",
    marginBottom: "20px"
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  blueButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "13px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  greenButton: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "13px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  orangeButton: {
    background: "#ea580c",
    color: "white",
    border: "none",
    padding: "13px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }

};

export default StateCard;