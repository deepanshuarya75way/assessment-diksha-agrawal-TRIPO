import React, { useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5000";

function HotelPartner() {
  const [form, setForm] = useState({
    hotelName: "",
    description: "",
    stateName: "",
    cityName: "",
    address: "",
    images: "",
    pricePerNight: "",
    amenities: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    website: "",
    googleMap: "",
    openTime: "24 Hours",
    closeTime: "24 Hours",
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

        pricePerNight: Number(form.pricePerNight),

        images: form.images
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        amenities: form.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await axios.post(
        `${API}/api/partners/hotels`,
        payload
      );

      if (response.data.success) {
        setMessage(
          "✅ Hotel application submitted successfully. TRIPO will verify your details."
        );

        setForm({
          hotelName: "",
          description: "",
          stateName: "",
          cityName: "",
          address: "",
          images: "",
          pricePerNight: "",
          amenities: "",
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
          website: "",
          googleMap: "",
          openTime: "24 Hours",
          closeTime: "24 Hours",
        });
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to submit hotel application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>
          🏨 Become a TRIPO Hotel Partner
        </h1>

        <p style={styles.subtitle}>
          Submit your real hotel information. Your listing
          will appear to customers only after TRIPO verification.
        </p>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h2 style={styles.sectionTitle}>
            Hotel Information
          </h2>

          <input
            name="hotelName"
            placeholder="Hotel Name *"
            value={form.hotelName}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <textarea
            name="description"
            placeholder="Hotel Description"
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
            placeholder="Complete Hotel Address *"
            value={form.address}
            onChange={handleChange}
            required
            style={styles.textarea}
          />

          <input
            type="number"
            name="pricePerNight"
            placeholder="Price Per Night ₹ *"
            value={form.pricePerNight}
            onChange={handleChange}
            min="0"
            required
            style={styles.input}
          />

          <input
            name="amenities"
            placeholder="Amenities e.g. WiFi, Parking, Pool"
            value={form.amenities}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>
            Hotel Image URLs
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
            placeholder="Hotel Website"
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
              : "Submit Hotel Partnership"}
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
      "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
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
    color: "#1d4ed8",
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
    background: "#eff6ff",
    color: "#1e40af",
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
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default HotelPartner;