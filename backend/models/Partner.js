import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    businessType: {
      type: String,
      enum: ["Hotel", "Restaurant", "Travel Agency"],
      required: true,
    },

    address: String,

    city: String,

    state: String,

    commission: {
      type: Number,
      default: 10,
    },

    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Partner", partnerSchema);