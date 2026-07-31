import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function StateDetails({ state, onClose }) {
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    if (!state) return;

    loadWeather();
  }, [state]);

  const loadWeather = async () => {
    try {
      setWeatherLoading(true);
      setWeatherError("");

      const city = state.capital || state.name;

      const res = await axios.get(
        `${API}/api/weather`,
        {
          params: {
            city,
          },
        }
      );

      setWeather(res.data.data || res.data);
    } catch (error) {
      console.log("Weather Error:", error);
      setWeatherError("Weather information unavailable.");
    } finally {
      setWeatherLoading(false);
    }
  };

  if (!state) return null;

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `best hotels in ${state.name}`
  )}`;

  const restaurantSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `best restaurants in ${state.name}`
  )}`;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${state.name}, India`
  )}`;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        {/* CLOSE */}
        <button
          type="button"
          style={styles.closeButton}
          onClick={onClose}
        >
          ✕
        </button>

        {/* IMAGE */}
        <img
          src={state.image}
          alt={state.name}
          style={styles.heroImage}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* TITLE */}
        <div style={styles.header}>
          <span style={styles.badge}>🇮🇳 INDIA</span>

          <h1 style={styles.title}>
            {state.name}
          </h1>

          <p style={styles.capital}>
            📍 Capital: <strong>{state.capital || "N/A"}</strong>
          </p>
        </div>

        {/* DESCRIPTION */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            About {state.name}
          </h2>

          <p style={styles.description}>
            {state.description ||
              `${state.name} is a beautiful destination in India with unique culture, food, attractions and travel experiences.`}
          </p>
        </section>

        {/* WEATHER */}
        <section style={styles.weatherCard}>
          <h2 style={styles.sectionTitle}>
            🌤️ Live Weather
          </h2>

          {weatherLoading ? (
            <p style={styles.darkText}>
              Loading live weather...
            </p>
          ) : weatherError ? (
            <p style={styles.errorText}>
              {weatherError}
            </p>
          ) : weather ? (
            <div style={styles.weatherGrid}>

              <div style={styles.weatherItem}>
                <span>📍 Location</span>
                <strong>
                  {weather.city ||
                    weather.location ||
                    state.capital ||
                    state.name}
                </strong>
              </div>

              <div style={styles.weatherItem}>
                <span>🌡️ Temperature</span>
                <strong>
                  {weather.temperature ??
                    weather.temp ??
                    "N/A"}
                  {weather.temperature !== undefined ||
                  weather.temp !== undefined
                    ? "°C"
                    : ""}
                </strong>
              </div>

              <div style={styles.weatherItem}>
                <span>☁️ Condition</span>
                <strong>
                  {weather.condition ||
                    weather.description ||
                    "N/A"}
                </strong>
              </div>

              <div style={styles.weatherItem}>
                <span>💧 Humidity</span>
                <strong>
                  {weather.humidity !== undefined
                    ? `${weather.humidity}%`
                    : "N/A"}
                </strong>
              </div>

              <div style={styles.weatherItem}>
                <span>💨 Wind</span>
                <strong>
                  {weather.windSpeed !== undefined
                    ? `${weather.windSpeed} km/h`
                    : weather.wind !== undefined
                    ? `${weather.wind} km/h`
                    : "N/A"}
                </strong>
              </div>

            </div>
          ) : (
            <p style={styles.darkText}>
              No weather information available.
            </p>
          )}
        </section>

        {/* TRAVEL FEATURES */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            ✨ Explore {state.name}
          </h2>

          <div style={styles.featureGrid}>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🏨</div>
              <h3>Hotels</h3>
              <p>
                Find hotels and accommodation options
                around {state.name}.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🍽️</div>
              <h3>Restaurants</h3>
              <p>
                Discover restaurants and local food
                options in {state.name}.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>💰</div>
              <h3>Budget Travel</h3>
              <p>
                Plan your trip according to your
                available budget.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🗺️</div>
              <h3>Navigation</h3>
              <p>
                Open the location directly in Google
                Maps.
              </p>
            </div>

          </div>
        </section>

        {/* ACTION BUTTONS */}
        <section style={styles.actionSection}>

          <h2 style={styles.sectionTitle}>
            🚀 Start Exploring
          </h2>

          <div style={styles.buttonGrid}>

            <a
              href={googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.actionButton}
            >
              🏨 Find Hotels
            </a>

            <a
              href={restaurantSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.actionButton}
            >
              🍽️ Find Restaurants
            </a>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.actionButton}
            >
              🗺️ Open Google Maps
            </a>

          </div>

        </section>

        {/* WHY VISIT */}
        <section style={styles.whySection}>

          <h2 style={styles.sectionTitle}>
            ❤️ Why Visit {state.name}?
          </h2>

          <ul style={styles.list}>

            <li>Beautiful tourist destinations</li>
            <li>Local food and restaurants</li>
            <li>Hotels and accommodation options</li>
            <li>Budget-friendly travel planning</li>
            <li>Live weather information</li>
            <li>Google Maps navigation</li>
            <li>TRIPO booking and payment system</li>

          </ul>

        </section>

        {/* FOOTER */}
        <div style={styles.bottom}>
          <p>
            ✈️ Plan your journey with{" "}
            <strong>TRIPO</strong>
          </p>

          <p>
            Founder: <strong>Diksha Agrawal</strong>
          </p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.78)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 99999,
  },

  modal: {
    width: "900px",
    maxWidth: "100%",
    maxHeight: "94vh",
    overflowY: "auto",
    background: "#ffffff",
    borderRadius: "24px",
    position: "relative",
    boxShadow: "0 25px 80px rgba(0,0,0,0.45)",
    color: "#111827",
  },

  closeButton: {
    position: "absolute",
    right: "18px",
    top: "18px",
    zIndex: 10,
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "none",
    background: "#ef4444",
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  heroImage: {
    width: "100%",
    height: "360px",
    objectFit: "cover",
    display: "block",
    borderRadius: "24px 24px 0 0",
  },

  header: {
    padding: "28px 35px 10px",
  },

  badge: {
    display: "inline-block",
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "7px 14px",
    borderRadius: "30px",
    fontWeight: "700",
    fontSize: "13px",
  },

  title: {
    fontSize: "42px",
    margin: "14px 0 8px",
    color: "#111827",
  },

  capital: {
    color: "#374151",
    fontSize: "17px",
  },

  section: {
    padding: "20px 35px",
  },

  sectionTitle: {
    color: "#111827",
    fontSize: "25px",
    marginBottom: "15px",
  },

  description: {
    color: "#374151",
    fontSize: "17px",
    lineHeight: "1.8",
    margin: 0,
  },

  weatherCard: {
    margin: "15px 35px",
    padding: "25px",
    borderRadius: "18px",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
  },

  weatherGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "14px",
  },

  weatherItem: {
    background: "#ffffff",
    padding: "16px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    color: "#374151",
  },

  darkText: {
    color: "#374151",
  },

  errorText: {
    color: "#dc2626",
    fontWeight: "600",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(190px,1fr))",
    gap: "15px",
  },

  featureCard: {
    padding: "20px",
    borderRadius: "16px",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    color: "#374151",
  },

  featureIcon: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  actionSection: {
    margin: "10px 35px 25px",
    padding: "25px",
    background: "#f8fafc",
    borderRadius: "18px",
  },

  buttonGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(190px,1fr))",
    gap: "12px",
  },

  actionButton: {
    textDecoration: "none",
    textAlign: "center",
    padding: "14px 18px",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
  },

  whySection: {
    margin: "10px 35px 25px",
    padding: "25px",
    borderRadius: "18px",
    background: "#f9fafb",
  },

  list: {
    color: "#374151",
    lineHeight: "2",
    paddingLeft: "25px",
    fontSize: "16px",
  },

  bottom: {
    textAlign: "center",
    padding: "25px",
    background: "#111827",
    color: "#ffffff",
    borderRadius: "0 0 24px 24px",
  },
};

export default StateDetails;