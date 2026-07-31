import React from "react";

function Partner() {
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
            "linear-gradient(135deg,#1e293b,#0f172a)",
          borderRadius: "20px",
          padding: "45px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,.35)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="/tripo-logo.jpeg"
            alt="TRIPO"
            style={{
              width: "220px",
              marginBottom: "20px",
            }}
          />

          <h1
            style={{
              color: "#60a5fa",
              marginBottom: "10px",
            }}
          >
            Partner With TRIPO Private Limited
          </h1>

          <p
            style={{
              color: "#f3f4f6",
              fontSize: "18px",
              lineHeight: "32px",
            }}
          >
            TRIPO welcomes hotels, restaurants,
            resorts, homestays, cafés, travel
            agencies, tour operators and transport
            providers from across India to become
            our trusted partners.
          </p>
        </div>

        <hr
          style={{
            margin: "35px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <h2 style={{ color: "#60a5fa" }}>
          🤝 Who Can Partner With Us?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {[
            "🏨 Hotels",
            "🏡 Homestays",
            "🏖 Resorts",
            "🍽 Restaurants",
            "☕ Cafés",
            "🚖 Cab Services",
            "🚌 Tour Operators",
            "✈ Travel Agencies",
          ].map((item) => (
            <div
              key={item}
              style={{
                background: "#1e3a8a",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#ffffff",
                fontSize: "18px",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <hr
          style={{
            margin: "40px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <h2 style={{ color: "#60a5fa" }}>
          🚀 Benefits of Joining TRIPO
        </h2>

        <ul
          style={{
            lineHeight: "34px",
            color: "#f3f4f6",
            fontSize: "17px",
          }}
        >
          <li>Increase your online visibility across India.</li>
          <li>Reach thousands of travellers every month.</li>
          <li>Get featured in AI travel recommendations.</li>
          <li>Receive genuine customer bookings.</li>
          <li>Promote your hotel or restaurant digitally.</li>
          <li>Become part of India's AI-powered travel ecosystem.</li>
          <li>Grow your business with smart travel technology.</li>
        </ul>

                <hr
          style={{
            margin: "40px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <h2 style={{ color: "#60a5fa" }}>
          📩 Partnership Enquiry
        </h2>

        <div
          style={{
            background: "#1e3a8a",
            borderRadius: "15px",
            padding: "25px",
            marginTop: "20px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              lineHeight: "34px",
              color: "#f3f4f6",
            }}
          >
            <strong>Email:</strong>
            <br />
            contact@tripoindia.in
          </p>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "34px",
              color: "#f3f4f6",
            }}
          >
            Our partnership team will review your request
            and contact you as soon as possible. We welcome
            hotels, restaurants, cafés, resorts, travel
            agencies, tour operators and tourism businesses
            from all over India to become part of the
            TRIPO travel ecosystem.
          </p>
        </div>

        <hr
          style={{
            margin: "40px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <div style={{ textAlign: "center" }}>
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

export default Partner;