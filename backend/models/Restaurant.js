import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: null,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    averageCost: {
      type: Number,
      min: 0,
      default: 0,
    },

    cuisine: {
      type: [String],
      default: [],
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    ownerPhone: {
      type: String,
      required: true,
      trim: true,
    },

    ownerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    website: {
      type: String,
      default: "",
    },

    googleMap: {
      type: String,
      default: "",
    },

    openTime: {
      type: String,
      default: "10:00 AM",
    },

    closeTime: {
      type: String,
      default: "11:00 PM",
    },

    isPartner: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    commissionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 10,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model(
  "Restaurant",
  restaurantSchema
);

export default Restaurant;