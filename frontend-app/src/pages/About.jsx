import React from "react";

function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          background:
            "linear-gradient(135deg,rgba(15,23,42,.96),rgba(30,58,138,.96),rgba(37,99,235,.96))",
          borderRadius: "20px",
          padding: "45px",
          boxShadow: "0 15px 40px rgba(0,0,0,.35)",
          color: "#ffffff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="/tripo-logo.jpeg"
            alt="TRIPO"
            style={{
              width: "220px",
              marginBottom: "20px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          <h1
            style={{
              color: "#60a5fa",
              marginBottom: "15px",
            }}
          >
            About TRIPO Private Limited
          </h1>

          <p
            style={{
              color: "#f3f4f6",
              fontSize: "18px",
              lineHeight: "34px",
            }}
          >
            TRIPO Private Limited is an AI-powered smart travel platform
            designed to simplify travel planning across India. Our platform
            combines Artificial Intelligence with tourism to help travellers
            discover destinations, estimate travel budgets, explore hotels
            and restaurants, receive intelligent travel assistance and enjoy
            a smooth booking experience from a single platform.
          </p>
        </div>

        <hr
          style={{
            margin: "35px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <h2 style={{ color: "#60a5fa" }}>
          🌍 What TRIPO Offers
        </h2>

        <ul
          style={{
            lineHeight: "34px",
            color: "#f3f4f6",
            fontSize: "17px",
          }}
        >
          <li>🤖 AI Travel Assistant for smart travel planning.</li>
          <li>💰 AI Budget Calculator for accurate trip budgeting.</li>
          <li>🏨 Hotel recommendations across India.</li>
          <li>🍽 Restaurant recommendations.</li>
          <li>🗺 Information for all Indian States & Union Territories.</li>
          <li>📍 Tourist attractions with complete details.</li>
          <li>🌦 Live weather updates.</li>
          <li>🎫 Secure booking system.</li>
          <li>🔎 Smart destination search.</li>
          <li>📅 AI generated travel itineraries.</li>
        </ul>

        <hr
          style={{
            margin: "35px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <h2 style={{ color: "#60a5fa" }}>
          🚀 Our Vision
        </h2>

        <p
          style={{
            color: "#f3f4f6",
            lineHeight: "34px",
            fontSize: "17px",
          }}
        >
          Our vision is to become India's most trusted AI-powered travel
          platform by bringing intelligent planning, budget estimation,
          hotel discovery, restaurant recommendations, weather updates and
          seamless travel booking together in one place.
        </p>

        <hr
          style={{
            margin: "35px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <h2 style={{ color: "#60a5fa" }}>
          📌 How to Use TRIPO
        </h2>

        <ol
          style={{
            lineHeight: "34px",
            color: "#f3f4f6",
            fontSize: "17px",
          }}
        >
          <li>Create your TRIPO account.</li>
          <li>Login securely.</li>
          <li>Search your favourite destination.</li>
          <li>Explore complete state details.</li>
          <li>Use AI Travel Assistant.</li>
          <li>Calculate your travel budget.</li>
          <li>Book your trip.</li>
          <li>Share your valuable feedback.</li>
        </ol>

                <hr
          style={{
            margin: "35px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <h2 style={{ color: "#60a5fa" }}>
          ⭐ Why Choose TRIPO?
        </h2>

        <p
          style={{
            color: "#f3f4f6",
            lineHeight: "34px",
            fontSize: "17px",
          }}
        >
          TRIPO combines Artificial Intelligence with modern travel
          technology to provide an easy, fast and reliable travel
          experience. Instead of using multiple websites for hotels,
          restaurants, weather updates and budget planning, users can
          access everything in one platform. Our goal is to make travel
          planning smarter, affordable and hassle-free for everyone.
        </p>

        <hr
          style={{
            margin: "35px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <div
          style={{
            textAlign: "center",
            marginTop: "45px",
          }}
        >
          <button
            onClick={() =>
              (window.location.href = "/home")
            }
            style={{
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              padding: "15px 35px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            ⬅ Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;