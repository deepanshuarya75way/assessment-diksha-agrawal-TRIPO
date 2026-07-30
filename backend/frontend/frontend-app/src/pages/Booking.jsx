import axios from "axios";

export default function Booking({ city, place, price }) {

  const book = async () => {
    await axios.post("http://localhost:5000/api/bookings", {
      city,
      place,
      price
    });

    alert("Booked ✅");
  };

  return (
    <button onClick={book}>Book Now ₹{price}</button>
  );
}