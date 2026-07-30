import axios from "axios";

function CityCard({ city }) {

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: city.price }
      );

      const options = {
        key: "rzp_test_XXXXXXXX", // same as .env
        amount: data.amount,
        currency: "INR",
        name: "TRIPO",
        description: city.name + " Trip",
        order_id: data.id,
        handler: function () {
          alert("✅ Payment Successful");
        },
        prefill: {
          name: "User",
          email: "test@gmail.com",
        },
        theme: {
          color: "#ff5a5f",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert("❌ Payment Failed");
    }
  };

  return (
    <div className="card">
      <img src={city.image} alt="" />
      <h3>{city.name}</h3>
      <p>₹{city.price}</p>

      <button onClick={handlePayment}>
        Book & Pay
      </button>
    </div>
  );
}

export default CityCard;