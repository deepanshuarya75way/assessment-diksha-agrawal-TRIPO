import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },

    name: {
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

    averageBudget: {
      type: Number,
      default: 3000,
    },

    weather: {
      type: String,
      default: "",
    },

    bestTimeToVisit: {
      type: String,
      default: "",
    },

    googleMap: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("City", citySchema);