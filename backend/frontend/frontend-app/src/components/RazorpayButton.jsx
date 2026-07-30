import { createOrder } from "../services/api";

function RazorpayButton() {
  const payNow = async () => {
    const { data } = await createOrder(500);

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: data.amount,
      currency: "INR",
      name: "Tripo",
      order_id: data.id,
      handler: function (response) {
        alert("Payment Success");
        console.log(response);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={payNow}>💳 Pay Now</button>;
}

export default RazorpayButton;