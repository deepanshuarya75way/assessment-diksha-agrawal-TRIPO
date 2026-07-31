import React from "react";
import GoogleMap from "../components/GoogleMap";

function Details({ place, onClose }) {
  if (!place) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.close} onClick={onClose}>
          ✖
        </button>

        <img
          src={place.image}
          alt={place.name}
          style={styles.image}
        />

        <div style={styles.content}>
          <h1>{place.name}</h1>

          <p>
            <b>📍 Location:</b>{" "}
            {place.location || place.city || "Not Available"}
          </p>

          <p>
            <b>⭐ Rating:</b> {place.rating}
          </p>

          <p>
            <b>💰 Budget:</b> ₹{place.budget}
          </p>

          <p>
            <b>🍴 Famous Food:</b>{" "}
            {place.food || "Local Cuisine"}
          </p>

          <p>
            <b>🏨 Best Stay:</b>{" "}
            {place.stay || "Hotels Available"}
          </p>

          <p>
            <b>🌦 Weather:</b>{" "}
            {place.weather || "Weather Available"}
          </p>

          <p style={{ marginTop: 20 }}>
            {place.description}
          </p>

          <hr />

          <h2>📍 Google Map</h2>

          {place.latitude && place.longitude ? (
            <GoogleMap
              latitude={place.latitude}
              longitude={place.longitude}
            />
          ) : (
            <p>Location not available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    width: "90%",
    maxWidth: "1100px",
    background: "#fff",
    borderRadius: "15px",
    overflow: "auto",
    maxHeight: "95vh",
    position: "relative",
  },

  close: {
    position: "absolute",
    right: 15,
    top: 15,
    width: 45,
    height: 45,
    border: "none",
    borderRadius: "50%",
    background: "red",
    color: "#fff",
    cursor: "pointer",
    fontSize: 22,
  },

  image: {
    width: "100%",
    height: 400,
    objectFit: "cover",
  },

  content: {
    padding: 30,
  },
};

export default Details;