import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Booking from "../pages/Booking";
import StateDetails from "../pages/StateDetails";

import BudgetCalculator from "../components/BudgetCalculator";
import AIAssistant from "../components/AIAssistant";

const API =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// Fallback images for states whose database image is missing/broken.
// The original database image is always tried first.
const fallbackImages = {
  Jharkhand:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",

  Karnataka:
    "https://images.unsplash.com/photo-1600100397608-f010d5d5b6c7?auto=format&fit=crop&w=1200&q=80",

  "Tamil Nadu":
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
};

const defaultIndiaImage =
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80";

function Home() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedState, setSelectedState] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    loadStates();
  }, []);

  async function loadStates() {
    try {
      const res = await axios.get(`${API}/api/states`);

      setStates(res.data?.data || []);
    } catch (err) {
      console.error("State loading error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to load states. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredStates = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return states;
    }

    return states.filter((state) =>
      String(state.name || "")
        .toLowerCase()
        .includes(keyword)
    );
  }, [search, states]);

  const openDetails = (state) => {
    setSelectedState(state);
    setShowDetails(true);
  };

  const openBooking = (state) => {
    setSelectedState(state);
    setShowBooking(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedState(null);
  };

  const closeBooking = () => {
    setShowBooking(false);
    setSelectedState(null);
  };

  // Get image from database first.
  // If the database image is broken, use state-specific fallback.
  const getStateImage = (state) => {
    const stateName = String(state?.name || "").trim();

    return (
      state?.image ||
      fallbackImages[stateName] ||
      defaultIndiaImage
    );
  };

  const handleImageError = (event, state) => {
    const stateName = String(state?.name || "").trim();

    // Prevent infinite onError loop
    event.currentTarget.onerror = null;

    event.currentTarget.src =
      fallbackImages[stateName] || defaultIndiaImage;
  };

  return (
    <>
      <Navbar />

      {/* ================= HERO + STATES ================= */}

      <section
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
          padding: "40px 30px 70px",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "auto",
          }}
        >
          {/* ================= HERO ================= */}

          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            {/* TRIPO LOGO */}

            <img
              src="/tripo-logo.png"
              alt="TRIPO"
              style={{
                width: "250px",
                maxWidth: "80%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                margin: "0 auto 25px",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <h1
              style={{
                fontSize: "55px",
                color: "#ffffff",
                marginBottom: "20px",
                fontWeight: "700",
              }}
            >
              Welcome To TRIPO
            </h1>

            <p
              style={{
                color: "#dbeafe",
                fontSize: "20px",
                maxWidth: "900px",
                margin: "auto",
                lineHeight: "35px",
              }}
            >
              India's AI Powered Travel Platform.
              Explore all 28 States & 8 Union Territories,
              discover hotels, restaurants, plan your
              budget, chat with AI and securely book
              your next journey.
            </p>

            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search State..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "420px",
                maxWidth: "95%",
                marginTop: "35px",
                padding: "16px 22px",
                borderRadius: "50px",
                border: "none",
                outline: "none",
                fontSize: "17px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* ================= LOADING ================= */}

          {loading ? (
            <h2
              style={{
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Loading States...
            </h2>
          ) : filteredStates.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#ffffff",
                padding: "50px 20px",
              }}
            >
              <h2>No state found</h2>

              <p
                style={{
                  color: "#dbeafe",
                  marginTop: "10px",
                }}
              >
                Try searching another state.
              </p>
            </div>
          ) : (
            /* ================= STATE CARDS ================= */

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(330px,1fr))",
                gap: "30px",
              }}
            >
              {filteredStates.map((state) => (
                <div
                  key={state._id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow:
                      "0 12px 30px rgba(0,0,0,.18)",
                    transition:
                      "transform .3s ease, box-shadow .3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 18px 40px rgba(0,0,0,.28)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(0,0,0,.18)";
                  }}
                >
                  {/* ================= IMAGE ================= */}

                  <img
                    src={getStateImage(state)}
                    alt={`${state.name} - TRIPO`}
                    loading="lazy"
                    onError={(e) =>
                      handleImageError(e, state)
                    }
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                      display: "block",
                      background: "#e5e7eb",
                    }}
                  />

                  <div
                    style={{
                      padding: "22px",
                    }}
                  >
                    {/* STATE NAME */}

                    <h2
                      style={{
                        marginBottom: "12px",
                        color: "#111827",
                      }}
                    >
                      {state.name}
                    </h2>

                    {/* CAPITAL */}

                    <p
                      style={{
                        color: "#2563eb",
                        fontWeight: "600",
                      }}
                    >
                      Capital : {state.capital || "N/A"}
                    </p>

                    {/* DESCRIPTION */}

                    <p
                      style={{
                        marginTop: "15px",
                        color: "#4b5563",
                        lineHeight: "28px",
                      }}
                    >
                      {state.description
                        ? state.description.substring(
                            0,
                            120
                          ) + "..."
                        : "Explore this amazing destination with TRIPO."}
                    </p>

                    {/* ================= ONLY TWO BUTTONS ================= */}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "1fr 1fr",
                        gap: "12px",
                        marginTop: "25px",
                      }}
                    >
                      {/* VIEW DETAILS */}

                      <button
                        type="button"
                        onClick={() =>
                          openDetails(state)
                        }
                        style={{
                          padding: "13px 10px",
                          border: "none",
                          borderRadius: "10px",
                          background: "#2563eb",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontSize: "15px",
                          fontWeight: "700",
                        }}
                      >
                        View Details
                      </button>

                      {/* BOOK TRIP */}

                      <button
                        type="button"
                        onClick={() =>
                          openBooking(state)
                        }
                        style={{
                          padding: "13px 10px",
                          border: "none",
                          borderRadius: "10px",
                          background: "#16a34a",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontSize: "15px",
                          fontWeight: "700",
                        }}
                      >
                        Book Trip
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= AI BUDGET CALCULATOR ================= */}

      <BudgetCalculator />

      {/* ================= AI ASSISTANT ================= */}

      <AIAssistant />

      {/* ================= STATE DETAILS ================= */}

      {showDetails && selectedState && (
        <StateDetails
          state={selectedState}
          onClose={closeDetails}
        />
      )}

      {/* ================= BOOKING ================= */}

      {showBooking && selectedState && (
        <Booking
          place={selectedState}
          onClose={closeBooking}
        />
      )}

      {/* ================= FOOTER ================= */}

      <Footer />
    </>
  );
}

export default Home;