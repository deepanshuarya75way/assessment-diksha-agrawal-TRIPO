import React, { useState } from "react";

import Details from "../pages/Details";
import Booking from "../pages/Booking";

function CityCard({ place }) {

  const [showDetails, setShowDetails] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  return (

    <div className="card">

      <img src={place.image} alt={place.name} />

      <div className="card-content">

        <h2>{place.name}</h2>

        <p>{place.description}</p>

        <p>⭐ {place.rating}</p>

        <button onClick={() => setShowDetails(true)}>
          View Details
        </button>

        <button onClick={() => setShowBooking(true)}>
          Book & Pay
        </button>

      </div>

      {showDetails && (
        <Details
          place={place}
          setShowDetails={setShowDetails}
        />
      )}

      {showBooking && (
        <Booking
          place={place}
          setShowBooking={setShowBooking}
        />
      )}

    </div>
  );
}

export default CityCard;