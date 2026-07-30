import mongoose from "mongoose";

const touristPlaceSchema = new mongoose.Schema(
  {
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    openingTime: {
      type: String,
      default: "09:00 AM",
    },

    closingTime: {
      type: String,
      default: "06:00 PM",
    },

    bestSeason: {
      type: String,
      default: "October to March",
    },

    latitude: {
      type: Number,
      default: 0,
    },

    longitude: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 4.7,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TouristPlace", touristPlaceSchema);