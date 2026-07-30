import React, { useState } from "react";

const places = [

  {
    name: "Goa",
    price: 12000,
  },

  {
    name: "Rajasthan",
    price: 18000,
  },

  {
    name: "Kerala",
    price: 15000,
  },

  {
    name: "Kashmir",
    price: 25000,
  },

  {
    name: "Manali",
    price: 20000,
  },

  {
    name: "Mumbai",
    price: 10000,
  },

  {
    name: "Delhi",
    price: 9000,
  },

  {
    name: "Kolkata",
    price: 11000,
  },

];

function Budget() {

  const [budget, setBudget] =
    useState("");

  const [results, setResults] =
    useState([]);

  const calculate = () => {

    const filtered =
      places.filter(
        (place) =>
          place.price <=
          Number(budget)
      );

    setResults(filtered);
  };

  return (
    <div className="assistant-box">

      <h1>
        💰 Budget Calculator
      </h1>

      <input
        type="number"
        placeholder="Enter Budget"
        value={budget}
        onChange={(e) =>
          setBudget(e.target.value)
        }
      />

      <button onClick={calculate}>
        Calculate
      </button>

      {results.map(
        (place, index) => (

          <div key={index}>

            <h2>
              {place.name}
            </h2>

            <p>
              ₹{place.price}
            </p>

          </div>
        )
      )}

    </div>
  );
}

export default Budget;