import mongoose from "mongoose";

const bookingSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      touristPlace: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "TouristPlace",
        required: true,
      },

      customerName: {
        type: String,
        required: true,
        trim: true,
      },

      customerEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      customerPhone: {
        type: String,
        required: true,
        trim: true,
      },

      members: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },

      checkIn: {
        type: Date,
        required: true,
      },

      checkOut: {
        type: Date,
        required: true,
      },

      totalAmount: {
        type: Number,
        required: true,
        min: 0,
      },

      paymentStatus: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
        ],
        default: "pending",
      },

      bookingStatus: {
        type: String,
        enum: [
          "pending",
          "confirmed",
          "cancelled",
        ],
        default: "pending",
      },

      razorpayOrderId: {
        type: String,
        default: "",
      },

      razorpayPaymentId: {
        type: String,
        default: "",
      },

      invoiceNumber: {
        type: String,
        default: "",
      },

      bookingDate: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Booking",
  bookingSchema
);