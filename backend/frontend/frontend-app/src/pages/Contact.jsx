import React from "react";

function Contact() {
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
          maxWidth: "1000px",
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
            Contact TRIPO Private Limited
          </h1>

          <p
            style={{
              color: "#f3f4f6",
              fontSize: "18px",
              lineHeight: "30px",
            }}
          >
            We'd love to hear from you. Whether you have a
            travel query, partnership proposal, booking
            question or technical issue, our team is here
            to help.
          </p>
        </div>

        <hr
          style={{
            margin: "35px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              background: "#1e3a8a",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2 style={{ color: "#93c5fd" }}>
              📧 Email Support
            </h2>

            <p
              style={{
                color: "#f3f4f6",
                lineHeight: "32px",
              }}
            >
              <strong>Official Email</strong>
              <br />
              contact@tripoindia.in
            </p>

            <p
              style={{
                color: "#f3f4f6",
                lineHeight: "32px",
              }}
            >
              <strong>General Contact</strong>
              <br />
              diksha6296@gmail.com
            </p>
          </div>

          <div
            style={{
              background: "#14532d",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2 style={{ color: "#86efac" }}>
              📞 Phone Support
            </h2>

            <p
              style={{
                color: "#f3f4f6",
                lineHeight: "32px",
              }}
            >
              Customer Support
              <br />
              +91 6207556344
            </p>
          </div>

                    <div
            style={{
              background: "#7c2d12",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2 style={{ color: "#fdba74" }}>
              🕒 Office Hours
            </h2>

            <p
              style={{
                color: "#f3f4f6",
                lineHeight: "32px",
              }}
            >
              Monday – Saturday
              <br />
              9:00 AM – 7:00 PM
            </p>
          </div>

          <div
            style={{
              background: "#4c1d95",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2 style={{ color: "#d8b4fe" }}>
              💼 Customer Services
            </h2>

            <ul
              style={{
                lineHeight: "32px",
                color: "#f3f4f6",
                paddingLeft: "20px",
              }}
            >
              <li>Travel Planning</li>
              <li>Trip Booking</li>
              <li>Hotel Assistance</li>
              <li>Restaurant Suggestions</li>
              <li>Technical Support</li>
              <li>General Enquiries</li>
            </ul>
          </div>
        </div>

        <hr
          style={{
            margin: "40px 0",
            borderColor: "rgba(255,255,255,.25)",
          }}
        />

        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#60a5fa",
            }}
          >
            Thank You for Choosing TRIPO ❤️
          </h2>

          <p
            style={{
              color: "#f3f4f6",
              lineHeight: "30px",
              marginBottom: "30px",
            }}
          >
            Our support team is committed to making your
            travel experience smooth, safe and memorable.
          </p>

          <button
            onClick={() =>
              (window.location.href = "/home")
            }
            style={{
              background: "#2563eb",
              color: "#fff",
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

export default Contact;