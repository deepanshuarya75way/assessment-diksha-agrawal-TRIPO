import crypto from "crypto";

import razorpay from "../config/razorpay.js";

import Booking from "../models/Booking.js";

// =====================================
// CREATE RAZORPAY ORDER
// =====================================

export const createOrder = async (
  req,
  res
) => {
  try {
    const amount =
      Number(req.body.amount);

    const bookingId =
      req.body.bookingId;

    if (
      !amount ||
      amount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid payment amount.",
      });
    }

    const options = {
      amount:
        Math.round(amount * 100),

      currency: "INR",

      receipt:
        `TRIPO_${Date.now()}`,
    };

    const order =
      await razorpay.orders.create(
        options
      );

    // Booking ko Razorpay order se connect karo
    if (bookingId) {
      await Booking.findByIdAndUpdate(
        bookingId,
        {
          razorpayOrderId:
            order.id,

          paymentStatus:
            "pending",

          bookingStatus:
            "pending",
        }
      );
    }

    return res.status(200).json({
      success: true,

      message:
        "Razorpay order created successfully.",

      data: order,
    });
  } catch (err) {
    console.error(
      "Razorpay create order error:",
      err.response?.data ||
        err
    );

    return res.status(500).json({
      success: false,

      message:
        err.response?.data
          ?.error?.description ||
        err.message ||
        "Unable to create Razorpay order.",
    });
  }
};

// =====================================
// VERIFY RAZORPAY PAYMENT
// =====================================

export const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment verification details are missing.",
      });
    }

    const secret =
      process.env
        .RAZORPAY_KEY_SECRET;

    if (!secret) {
      return res.status(500).json({
        success: false,
        message:
          "Razorpay secret is not configured on backend.",
      });
    }

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      if (bookingId) {
        await Booking.findByIdAndUpdate(
          bookingId,
          {
            paymentStatus:
              "failed",

            bookingStatus:
              "cancelled",
          }
        );
      }

      return res.status(400).json({
        success: false,
        message:
          "Invalid payment signature.",
      });
    }

    let booking = null;

    if (bookingId) {
      booking =
        await Booking.findById(
          bookingId
        );
    }

    if (!booking) {
      booking =
        await Booking.findOne({
          razorpayOrderId:
            razorpay_order_id,
        });
    }

    if (booking) {
      booking.paymentStatus =
        "paid";

      booking.bookingStatus =
        "confirmed";

      booking.razorpayOrderId =
        razorpay_order_id;

      booking.razorpayPaymentId =
        razorpay_payment_id;

      if (
        !booking.invoiceNumber
      ) {
        booking.invoiceNumber =
          `TRIPO-${Date.now()}`;
      }

      await booking.save();
    }

    return res.status(200).json({
      success: true,

      message:
        "Payment verified successfully.",

      paymentId:
        razorpay_payment_id,

      orderId:
        razorpay_order_id,

      booking: booking
        ? {
            id: booking._id,

            paymentStatus:
              booking.paymentStatus,

            bookingStatus:
              booking.bookingStatus,

            invoiceNumber:
              booking.invoiceNumber,
          }
        : null,
    });
  } catch (err) {
    console.error(
      "Payment verification error:",
      err.response?.data ||
        err
    );

    return res.status(500).json({
      success: false,

      message:
        err.message ||
        "Payment verification failed.",
    });
  }
};