import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    capital: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    famousPlaces: [
      {
        type: String,
      },
    ],

    famousFood: [
      {
        type: String,
      },
    ],

    bestTimeToVisit: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "",
    },

    population: {
      type: String,
      default: "",
    },

    area: {
      type: String,
      default: "",
    },

    weather: {
      type: String,
      default: "",
    },

    averageBudget: {
      type: Number,
      default: 5000,
    },

    googleMap: {
      type: String,
      default: "",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("State", stateSchema);