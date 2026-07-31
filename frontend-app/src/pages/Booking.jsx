import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import jsPDF from "jspdf";

const API =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:5000";

function Booking({ place, onClose }) {
  const [loading, setLoading] =
    useState(false);

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [razorpayReady, setRazorpayReady] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    members: 1,
    checkIn: "",
    checkOut: "",
  });

  const [paymentInfo, setPaymentInfo] =
    useState({
      status: "PENDING",
      paymentId: "",
      orderId: "",
    });

  useEffect(() => {
    const existingScript =
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

    if (existingScript) {
      if (window.Razorpay) {
        setRazorpayReady(true);
      }

      return;
    }

    const script =
      document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () => {
      setRazorpayReady(true);
    };

    script.onerror = () => {
      setRazorpayReady(false);

      alert(
        "Razorpay could not be loaded."
      );
    };

    document.body.appendChild(script);
  }, []);

  if (!place) {
    return null;
  }

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateDays = () => {
    if (
      !form.checkIn ||
      !form.checkOut
    ) {
      return 1;
    }

    const start = new Date(
      form.checkIn
    );

    const end = new Date(
      form.checkOut
    );

    const diff =
      (end.getTime() -
        start.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 1;
  };

  const calculateAmount = () => {
    const baseAmount = Number(
      place.averageBudget ||
        place.pricePerNight ||
        place.price ||
        5000
    );

    const members = Math.max(
      1,
      Number(form.members) || 1
    );

    return Math.round(
      baseAmount *
        members *
        calculateDays()
    );
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      alert(
        "Please enter your full name."
      );
      return false;
    }

    if (!form.email.trim()) {
      alert(
        "Please enter your email."
      );
      return false;
    }

    if (!form.phone.trim()) {
      alert(
        "Please enter your phone number."
      );
      return false;
    }

    if (!form.checkIn) {
      alert(
        "Please select check-in date."
      );
      return false;
    }

    if (!form.checkOut) {
      alert(
        "Please select check-out date."
      );
      return false;
    }

    if (
      new Date(form.checkOut) <=
      new Date(form.checkIn)
    ) {
      alert(
        "Check-out date must be after check-in date."
      );
      return false;
    }

    return true;
  };

  const getBookingPayload = () => ({
    touristPlace: place._id,

    customerName:
      form.name.trim(),

    customerEmail:
      form.email.trim(),

    customerPhone:
      form.phone.trim(),

    members:
      Number(form.members) || 1,

    checkIn:
      form.checkIn,

    checkOut:
      form.checkOut,

    totalAmount:
      calculateAmount(),
  });

  // =====================================
  // SAVE BOOKING
  // =====================================

  const handleBooking = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Please login before booking."
        );

        window.location.href =
          "/login";

        return;
      }

      const response =
        await axios.post(
          `${API}/api/booking`,
          getBookingPayload(),
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "Booking saved:",
        response.data
      );

      alert(
        "✅ Booking saved successfully."
      );
    } catch (err) {
      console.error(
        "Booking error:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.message ||
          "Booking could not be saved."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // INVOICE
  // =====================================

  const downloadInvoice = (
    statusOverride
  ) => {
    if (!validateForm()) {
      return;
    }

    const paymentStatus =
      statusOverride ||
      paymentInfo.status ||
      "PENDING";

    const invoiceNumber =
      `TRIPO-${Date.now()}`;

    const pdf = new jsPDF();

    pdf.setFontSize(24);
    pdf.setTextColor(
      37,
      99,
      235
    );

    pdf.text(
      "TRIPO",
      20,
      20
    );

    pdf.setTextColor(
      0,
      0,
      0
    );

    pdf.setFontSize(12);

    pdf.text(
      "AI Powered Travel Platform",
      20,
      30
    );

    pdf.line(
      20,
      35,
      190,
      35
    );

    pdf.setFontSize(18);

    pdf.text(
      "BOOKING INVOICE",
      20,
      48
    );

    pdf.setFontSize(11);

    pdf.text(
      `Invoice Number: ${invoiceNumber}`,
      20,
      62
    );

    pdf.text(
      `Invoice Date: ${new Date().toLocaleString()}`,
      20,
      70
    );

    pdf.text(
      `Customer Name: ${form.name}`,
      20,
      84
    );

    pdf.text(
      `Email: ${form.email}`,
      20,
      92
    );

    pdf.text(
      `Phone: ${form.phone}`,
      20,
      100
    );

    pdf.line(
      20,
      106,
      190,
      106
    );

    pdf.setFontSize(14);

    pdf.text(
      "TRIP DETAILS",
      20,
      120
    );

    pdf.setFontSize(11);

    pdf.text(
      `Destination: ${
        place.name ||
        "Selected Destination"
      }`,
      20,
      132
    );

    if (place.capital) {
      pdf.text(
        `Capital: ${place.capital}`,
        20,
        140
      );
    }

    pdf.text(
      `Members: ${form.members}`,
      20,
      148
    );

    pdf.text(
      `Check-in: ${form.checkIn}`,
      20,
      156
    );

    pdf.text(
      `Check-out: ${form.checkOut}`,
      20,
      164
    );

    pdf.text(
      `Total Days: ${calculateDays()}`,
      20,
      172
    );

    pdf.line(
      20,
      180,
      190,
      180
    );

    pdf.setFontSize(14);

    pdf.text(
      `Total Amount: Rs. ${calculateAmount()}`,
      20,
      194
    );

    pdf.setFontSize(12);

    pdf.text(
      `Payment Status: ${paymentStatus}`,
      20,
      204
    );

    if (paymentInfo.paymentId) {
      pdf.text(
        `Payment ID: ${paymentInfo.paymentId}`,
        20,
        214
      );
    }

    if (paymentInfo.orderId) {
      pdf.text(
        `Razorpay Order ID: ${paymentInfo.orderId}`,
        20,
        224
      );
    }

    pdf.line(
      20,
      232,
      190,
      232
    );

    pdf.setFontSize(11);

    pdf.text(
      "Thank you for choosing TRIPO.",
      20,
      245
    );

    pdf.text(
      "Founder: Diksha Agrawal",
      20,
      255
    );

    pdf.text(
      "TRIPO - AI Powered Travel Platform",
      20,
      265
    );

    pdf.save(
      `${invoiceNumber}.pdf`
    );
  };

  // =====================================
  // RAZORPAY
  // =====================================

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      alert(
        "Please login before making payment."
      );

      window.location.href =
        "/login";

      return;
    }

    if (
      !razorpayReady ||
      !window.Razorpay
    ) {
      alert(
        "Razorpay is still loading. Please try again."
      );

      return;
    }

    const razorpayKey =
      import.meta.env
        .VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      alert(
        "Razorpay Key ID is missing from frontend .env."
      );

      return;
    }

    try {
      setPaymentLoading(true);

      // -----------------------------
      // 1. CREATE BOOKING
      // -----------------------------

      const bookingResponse =
        await axios.post(
          `${API}/api/booking`,
          getBookingPayload(),
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const booking =
        bookingResponse.data?.data;

      const bookingId =
        booking?._id;

      // -----------------------------
      // 2. CREATE RAZORPAY ORDER
      // -----------------------------

      const orderResponse =
        await axios.post(
          `${API}/api/payment/create-order`,
          {
            amount:
              calculateAmount(),

            bookingId:
              bookingId || "",
          }
        );

      const order =
        orderResponse.data?.data ||
        orderResponse.data;

      if (!order?.id) {
        throw new Error(
          "Razorpay order was not created."
        );
      }

      // -----------------------------
      // 3. OPEN RAZORPAY
      // -----------------------------

      const options = {
        key: razorpayKey,

        amount:
          order.amount,

        currency:
          order.currency ||
          "INR",

        order_id:
          order.id,

        name: "TRIPO",

        description:
          `TRIPO Travel Booking - ${
            place.name ||
            "Travel"
          }`,

        image:
          "/tripo-logo.png",

        prefill: {
          name:
            form.name.trim(),

          email:
            form.email.trim(),

          contact:
            form.phone.trim(),
        },

        notes: {
          destination:
            place.name || "",

          members:
            String(form.members),

          checkIn:
            form.checkIn,

          checkOut:
            form.checkOut,

          bookingId:
            bookingId || "",
        },

        theme: {
          color:
            "#2563eb",
        },

        handler:
          async function (
            response
          ) {
            try {
              // -----------------------
              // 4. VERIFY PAYMENT
              // -----------------------

              const verifyResponse =
                await axios.post(
                  `${API}/api/payment/verify-payment`,
                  {
                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_signature:
                      response.razorpay_signature,

                    bookingId:
                      bookingId || "",
                  }
                );

              console.log(
                "Payment verification:",
                verifyResponse.data
              );

              if (
                !verifyResponse.data
                  ?.success
              ) {
                throw new Error(
                  "Payment verification failed."
                );
              }

              setPaymentInfo({
                status:
                  "PAID",

                paymentId:
                  response.razorpay_payment_id,

                orderId:
                  response.razorpay_order_id,
              });

              alert(
                "🎉 Payment Successful!"
              );

              // Generate paid invoice
              downloadInvoice(
                "PAID"
              );

              setPaymentLoading(
                false
              );

              if (onClose) {
                onClose();
              }
            } catch (
              verificationError
            ) {
              console.error(
                "Payment verification error:",
                verificationError
                  .response?.data ||
                  verificationError
              );

              setPaymentLoading(
                false
              );

              alert(
                verificationError
                  .response?.data
                  ?.message ||
                  "Payment was completed, but verification failed. Please contact TRIPO support."
              );
            }
          },

        modal: {
          ondismiss:
            function () {
              setPaymentLoading(
                false
              );
            },
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          setPaymentLoading(
            false
          );

          alert(
            response.error
              ?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (err) {
      console.error(
        "Razorpay error:",
        err.response?.data ||
          err
      );

      alert(
        err.response?.data
          ?.message ||
          err.message ||
          "Unable to start Razorpay payment."
      );

      setPaymentLoading(
        false
      );
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        <button
          style={styles.close}
          onClick={onClose}
        >
          ✖
        </button>

        <img
          src={
            place.image ||
            place.images?.[0] ||
            "https://via.placeholder.com/800x400?text=TRIPO"
          }
          alt={
            place.name ||
            "TRIPO"
          }
          style={styles.image}
        />

        <h1 style={styles.title}>
          {place.name ||
            "Travel Booking"}
        </h1>

        <p style={styles.subtitle}>
          Complete your trip details
          below.
        </p>

        <div style={styles.priceBox}>
          <span>
            Estimated Total
          </span>

          <strong>
            ₹{calculateAmount()}
          </strong>
        </div>

        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <label style={styles.label}>
          Number of Travellers
        </label>

        <input
          style={styles.input}
          type="number"
          min="1"
          name="members"
          value={form.members}
          onChange={handleChange}
        />

        <label style={styles.label}>
          Check In
        </label>

        <input
          style={styles.input}
          type="date"
          name="checkIn"
          value={form.checkIn}
          onChange={handleChange}
        />

        <label style={styles.label}>
          Check Out
        </label>

        <input
          style={styles.input}
          type="date"
          name="checkOut"
          value={form.checkOut}
          onChange={handleChange}
        />

        <div style={styles.summary}>
          <h3
            style={
              styles.summaryTitle
            }
          >
            Booking Summary
          </h3>

          <p>
            📍 Destination:
            <b>
              {" "}
              {place.name ||
                "Selected Destination"}
            </b>
          </p>

          <p>
            👥 Travellers:
            <b>
              {" "}
              {form.members}
            </b>
          </p>

          <p>
            📅 Days:
            <b>
              {" "}
              {calculateDays()}
            </b>
          </p>

          <p>
            💰 Total:
            <b>
              {" "}
              ₹{calculateAmount()}
            </b>
          </p>

          <p>
            💳 Payment:
            <b>
              {" "}
              {paymentInfo.status}
            </b>
          </p>
        </div>

        <button
          style={styles.bookButton}
          onClick={
            handleBooking
          }
          disabled={
            loading ||
            paymentLoading
          }
        >
          {loading
            ? "Saving Booking..."
            : "Confirm Booking"}
        </button>

        <button
          style={styles.paymentButton}
          onClick={
            handlePayment
          }
          disabled={
            paymentLoading ||
            loading
          }
        >
          {paymentLoading
            ? "Opening Razorpay..."
            : "💳 Pay Securely with Razorpay"}
        </button>

        <button
          style={
            styles.invoiceButton
          }
          onClick={() =>
            downloadInvoice(
              "PENDING"
            )
          }
        >
          📄 Download Invoice
        </button>

        {/* QR SECTION */}
        <div style={styles.qrBox}>
          <h3
            style={
              styles.qrTitle
            }
          >
            Alternative Payment
          </h3>

          <img
            src="/payment-qr.png"
            alt="TRIPO Payment QR"
            style={styles.qrImage}
            onError={(e) => {
              e.currentTarget.style.display =
                "none";
            }}
          />

          <p
            style={
              styles.qrText
            }
          >
            Scan using Google Pay,
            PhonePe, Paytm or BHIM
            UPI.
          </p>

          <small
            style={
              styles.qrNote
            }
          >
            Payment status will remain
            PENDING until payment is
            successfully verified.
          </small>
        </div>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,.75)",
    display: "flex",
    justifyContent:
      "center",
    alignItems:
      "center",
    zIndex: 9999,
    padding: "20px",
    boxSizing:
      "border-box",
  },

  modal: {
    background: "#ffffff",
    width: "650px",
    maxWidth: "100%",
    maxHeight: "92vh",
    overflowY: "auto",
    borderRadius: "20px",
    padding: "30px",
    position: "relative",
    textAlign: "center",
    boxShadow:
      "0 15px 40px rgba(0,0,0,.3)",
    boxSizing:
      "border-box",
    color: "#111827",
  },

  close: {
    position: "absolute",
    right: "15px",
    top: "15px",
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "50%",
    background: "#ef4444",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "18px",
    zIndex: 5,
  },

  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "15px",
    marginBottom: "20px",
  },

  title: {
    color: "#111827",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#4b5563",
    marginBottom: "20px",
  },

  priceBox: {
    background: "#eff6ff",
    border:
      "1px solid #bfdbfe",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    color: "#1e3a8a",
  },

  label: {
    display: "block",
    marginTop: "15px",
    textAlign: "left",
    fontWeight: "bold",
    color: "#111827",
  },

  input: {
    width: "100%",
    padding: "13px",
    marginTop: "8px",
    borderRadius: "10px",
    border:
      "1px solid #d1d5db",
    boxSizing:
      "border-box",
    fontSize: "16px",
    color: "#111827",
    background: "#ffffff",
  },

  summary: {
    marginTop: "25px",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "12px",
    textAlign: "left",
    lineHeight: "30px",
    border:
      "1px solid #e5e7eb",
    color: "#111827",
  },

  summaryTitle: {
    marginTop: 0,
    color: "#111827",
  },

  bookButton: {
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  paymentButton: {
    width: "100%",
    marginTop: "15px",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#16a34a",
    color: "#ffffff",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  invoiceButton: {
    width: "100%",
    marginTop: "15px",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#7c3aed",
    color: "#ffffff",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  qrBox: {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "15px",
    background: "#f9fafb",
    border:
      "2px dashed #2563eb",
    color: "#111827",
  },

  qrTitle: {
    color: "#111827",
  },

  qrImage: {
    width: "220px",
    height: "220px",
    objectFit: "contain",
    marginTop: "15px",
  },

  qrText: {
    color: "#374151",
    lineHeight: "24px",
  },

  qrNote: {
    color: "#6b7280",
    lineHeight: "20px",
  },
};

export default Booking;