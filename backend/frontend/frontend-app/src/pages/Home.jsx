
import { useState } from "react";


function Home() {
  const [amount, setAmount] = useState(1000);

  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount })
      });

      const data = await res.json();

      const options = {
        key: "rzp_test_SetbgrXQPYiM47",
        amount: data.amount,
        currency: "INR",
        name: "TRIPO",
        description: "Travel Booking",
        order_id: data.id,
        handler: function () {
          alert("Payment Successful ✅");
        },
        prefill: {
          name: "Diksha",
          email: "diksha6296@gmail.com",
          contact: "6207556344"
        },
        theme: {
          color: "#6C5CE7"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment Failed ❌");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🌍 TRIPO Travel Booking</h1>

      <h3>Enter Amount</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={handlePayment}>
        Book & Pay 💳
      </button>
    </div>
  );
}

export default Home;