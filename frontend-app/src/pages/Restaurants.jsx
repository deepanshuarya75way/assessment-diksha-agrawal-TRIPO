import React, { useEffect, useState } from "react";
import axios from "axios";

function Restaurants({ stateId, onClose }) {

  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000";

  useEffect(() => {

    if (stateId) {

      loadRestaurants();

    }

  }, [stateId]);

  const loadRestaurants = async () => {

    try {

      setLoading(true);

      const res = await axios.get(

        `${API}/api/restaurants/state/${stateId}`

      );

      if (res.data.success) {

        setRestaurants(res.data.data);

      } else {

        setRestaurants([]);

      }

    }

    catch (err) {

      console.log(err);

      alert("Unable to load restaurants.");

      setRestaurants([]);

    }

    finally {

      setLoading(false);

    }

  };

  
{
  loading ? (

    <h2
      style={{
        textAlign: "center",
        color: "#2563eb"
      }}
    >
      Loading Restaurants...
    </h2>

  ) : restaurants.length === 0 ? (

    <h2
      style={{
        textAlign: "center",
        color: "red"
      }}
    >
      No Restaurants Found
    </h2>

  ) : (

    restaurants.map((restaurant) => (

      <div
        key={restaurant._id}
        style={styles.card}
      >

        <img
          src={
            restaurant.images?.[0] ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          }
          alt={restaurant.restaurantName}
          style={styles.image}
        />

        <div style={styles.info}>

          <h2
            style={{
              color: "#1d4ed8"
            }}
          >
            {restaurant.restaurantName}
          </h2>

          <p>
            ⭐ Rating :
            <b>
              {" "}
              {restaurant.rating || "4.5"}
            </b>
          </p>

          <p>
            📍 Address :
            <b>
              {" "}
              {restaurant.address}
            </b>
          </p>

          <p>
            🍽 Average Cost :
            <b>
              {" "}
              ₹
              {restaurant.averageCost || 800}
            </b>
          </p>

          <p>
            👤 Owner :
            <b>
              {" "}
              {restaurant.ownerName || "Restaurant Owner"}
            </b>
          </p>

          <p>
            📞 Contact :
            <b>
              {" "}
              {restaurant.contactNumber ||
                restaurant.ownerPhone ||
                "Not Available"}
            </b>
          </p>

          <p>
            ✉ Email :
            <b>
              {" "}
              {restaurant.contactEmail ||
                restaurant.ownerEmail ||
                "Not Available"}
            </b>
          </p>

          <p>
            🕒 Timing :
            <b>
              {" "}
              {restaurant.openTime || "10:00 AM"}
              {" - "}
              {restaurant.closeTime || "11:00 PM"}
            </b>
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "20px"
            }}
          >

            <button
              style={styles.callBtn}
              onClick={() => {
                if (
                  restaurant.contactNumber ||
                  restaurant.ownerPhone
                ) {
                  window.location.href =
                    `tel:${
                      restaurant.contactNumber ||
                      restaurant.ownerPhone
                    }`;
                }
              }}
            >
              📞 Call
            </button>

            <button
              style={styles.mapBtn}
              onClick={() => {
                if (restaurant.googleMap) {
                  window.open(
                    restaurant.googleMap,
                    "_blank"
                  );
                }
              }}
            >
              📍 Google Map
            </button>

            <button
              style={styles.bookBtn}
              onClick={() =>
                alert(
                  "🍽 Table Booking feature will connect with backend."
                )
              }
            >
              🍽 Book Table
            </button>

          </div>

        </div>

      </div>

    ))

  )
}

const styles = {

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },

  container: {
    width: "92%",
    maxWidth: "1200px",
    height: "92%",
    background: "#ffffff",
    overflowY: "auto",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(0,0,0,.3)"
  },

  close: {
    float: "right",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },

  heading: {
    textAlign: "center",
    color: "#1d4ed8",
    marginBottom: "35px",
    fontSize: "35px"
  },

  card: {
    display: "flex",
    gap: "25px",
    marginBottom: "30px",
    padding: "20px",
    borderRadius: "18px",
    background: "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,.12)",
    transition: "0.3s"
  },

  image: {
    width: "320px",
    height: "230px",
    objectFit: "cover",
    borderRadius: "15px"
  },

  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    lineHeight: "30px",
    fontSize: "17px"
  },

  callBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  mapBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  bookBtn: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }
}
};

export default Restaurants;
  
