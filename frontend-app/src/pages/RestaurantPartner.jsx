import React, { useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5000";

function RestaurantPartner() {
  const [form, setForm] = useState({
    restaurantName: "",
    description: "",
    stateName: "",
    cityName: "",
    address: "",
    images: "",
    averageCost: "",
    cuisine: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    website: "",
    googleMap: "",
    openTime: "10:00 AM",
    closeTime: "11:00 PM",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...form,

        averageCost: Number(form.averageCost) || 0,

        images: form.images
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        cuisine: form.cuisine
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await axios.post(
        `${API}/api/partners/restaurants`,
        payload
      );

      if (response.data.success) {
        setMessage(
          "✅ Restaurant application submitted successfully. TRIPO will verify your details."
        );

        setForm({
          restaurantName: "",
          description: "",
          stateName: "",
          cityName: "",
          address: "",
          images: "",
          averageCost: "",
          cuisine: "",
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
          website: "",
          googleMap: "",
          openTime: "10:00 AM",
          closeTime: "11:00 PM",
        });
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to submit restaurant application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>
          🍽️ Become a TRIPO Restaurant Partner
        </h1>

        <p style={styles.subtitle}>
          Submit your actual restaurant information.
          Your listing will become visible after TRIPO verification.
        </p>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h2 style={styles.sectionTitle}>
            Restaurant Information
          </h2>

          <input
            name="restaurantName"
            placeholder="Restaurant Name *"
            value={form.restaurantName}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <textarea
            name="description"
            placeholder="Restaurant Description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <div style={styles.row}>
            <input
              name="stateName"
              placeholder="State *"
              value={form.stateName}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="cityName"
              placeholder="City"
              value={form.cityName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <textarea
            name="address"
            placeholder="Complete Restaurant Address *"
            value={form.address}
            onChange={handleChange}
            required
            style={styles.textarea}
          />

          <input
            type="number"
            name="averageCost"
            placeholder="Average Cost ₹"
            value={form.averageCost}
            onChange={handleChange}
            min="0"
            style={styles.input}
          />

          <input
            name="cuisine"
            placeholder="Cuisine e.g. Indian, Chinese, Italian"
            value={form.cuisine}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>
            Restaurant Image URLs
          </label>

          <textarea
            name="images"
            placeholder={
              "Paste one real image URL per line"
            }
            value={form.images}
            onChange={handleChange}
            style={styles.textarea}
          />

          <h2 style={styles.sectionTitle}>
            Owner Information
          </h2>

          <input
            name="ownerName"
            placeholder="Owner Name *"
            value={form.ownerName}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="tel"
            name="ownerPhone"
            placeholder="Owner Phone *"
            value={form.ownerPhone}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="ownerEmail"
            placeholder="Owner Email *"
            value={form.ownerEmail}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="url"
            name="website"
            placeholder="Restaurant Website"
            value={form.website}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="url"
            name="googleMap"
            placeholder="Google Maps URL"
            value={form.googleMap}
            onChange={handleChange}
            style={styles.input}
          />

          <h2 style={styles.sectionTitle}>
            Opening Hours
          </h2>

          <div style={styles.row}>
            <input
              name="openTime"
              placeholder="Opening Time"
              value={form.openTime}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="closeTime"
              placeholder="Closing Time"
              value={form.closeTime}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading
              ? "Submitting..."
              : "Submit Restaurant Partnership"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background:
      "linear-gradient(135deg, #0f172a, #7c2d12, #ea580c)",
  },

  card: {
    width: "90%",
    maxWidth: "900px",
    margin: "auto",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "22px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
  },

  heading: {
    textAlign: "center",
    color: "#ea580c",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "30px",
    lineHeight: "25px",
  },

  message: {
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
    background: "#fff7ed",
    color: "#9a3412",
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: "30px",
    marginBottom: "15px",
    color: "#1e293b",
  },

  row: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },

  label: {
    display: "block",
    marginTop: "10px",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    marginBottom: "15px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: "110px",
    padding: "14px",
    marginBottom: "15px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "15px",
    resize: "vertical",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "16px",
    marginTop: "20px",
    border: "none",
    borderRadius: "12px",
    background: "#ea580c",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default RestaurantPartner;