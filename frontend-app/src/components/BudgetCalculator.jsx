import React, { useMemo, useState } from "react";

function BudgetCalculator() {

  const [budget, setBudget] = useState({
    destination: "",
    days: 1,
    travellers: 1,
    hotel: "Standard"
  });

  const hotelPrice = {
    Budget: 1200,
    Standard: 2500,
    Luxury: 6500
  };

  const foodPerPerson = 700;
  const transportPerDay = 1200;
  const sightseeingPerPerson = 900;

  const total = useMemo(() => {

    const hotelCost =
      hotelPrice[budget.hotel] *
      Number(budget.days);

    const foodCost =
      foodPerPerson *
      Number(budget.days) *
      Number(budget.travellers);

    const transportCost =
      transportPerDay *
      Number(budget.days);

    const sightseeingCost =
      sightseeingPerPerson *
      Number(budget.travellers);

    return {
      hotelCost,
      foodCost,
      transportCost,
      sightseeingCost,
      total:
        hotelCost +
        foodCost +
        transportCost +
        sightseeingCost
    };

  }, [budget]);

  const handleChange = (e) => {

    setBudget({
      ...budget,
      [e.target.name]: e.target.value
    });

  };

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "60px auto",
        padding: "35px",
        background: "#ffffff",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        color: "#111827"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "10px"
        }}
      >
        💰 AI Travel Budget Calculator
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#6b7280",
          marginBottom: "35px"
        }}
      >
        Estimate your trip budget before booking.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >

        <input
          name="destination"
          placeholder="Destination"
          value={budget.destination}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="days"
          min="1"
          value={budget.days}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="travellers"
          min="1"
          value={budget.travellers}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="hotel"
          value={budget.hotel}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Budget">
            Budget Hotel
          </option>

          <option value="Standard">
            Standard Hotel
          </option>

          <option value="Luxury">
            Luxury Hotel
          </option>
        </select>

      </div>

      <div
        style={{
          marginTop: "40px",
          background: "#eff6ff",
          borderRadius: "18px",
          padding: "30px",
          color: "#111827"
        }}
      >

        <h2
          style={{
            color: "#1d4ed8",
            marginBottom: "20px"
          }}
        >
          Estimated Budget
        </h2>

        <p style={styles.resultText}>
          🏨 Hotel :
          <b> ₹{total.hotelCost}</b>
        </p>

        <p style={styles.resultText}>
          🍽 Food :
          <b> ₹{total.foodCost}</b>
        </p>

        <p style={styles.resultText}>
          🚖 Transport :
          <b> ₹{total.transportCost}</b>
        </p>

        <p style={styles.resultText}>
          📍 Sightseeing :
          <b> ₹{total.sightseeingCost}</b>
        </p>

        <hr style={{ margin: "20px 0" }} />

        <h2
          style={{
            color: "#16a34a"
          }}
        >
          Total Estimated Cost : ₹{total.total}
        </h2>

        <p
          style={{
            marginTop: "15px",
            color: "#4b5563",
            lineHeight: "28px"
          }}
        >
          This estimate is based on your selected
          number of travellers, trip duration and
          hotel category. Actual prices may vary by
          destination, season and availability.
        </p>

      </div>

    </section>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
    color: "#111827",
    background: "#ffffff"
  },

  resultText: {
    color: "#111827",
    fontSize: "16px",
    margin: "14px 0"
  }
};

export default BudgetCalculator;