import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";


dotenv.config();

const app = express();

/* =========================
   CORS
========================= */

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://192.168.31.221:3000",
  "http://192.168.31.221:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // and the origins listed above.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

/* =========================
   BODY PARSER
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */

app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/states", stateRoutes);

app.use("/api/cities", cityRoutes);

app.use("/api/booking", bookingRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/hotels", hotelRoutes);

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/weather", weatherRoutes);

app.use("/api/feedback", feedbackRoutes);

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TRIPO Backend Running Successfully",
  });
});

/* =========================
   MONGODB CONNECTION
========================= */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 TRIPO Server Running On Port ${PORT}`);
      console.log(`🌐 Local: http://localhost:${PORT}`);
      console.log(`🌐 Network: http://192.168.31.221:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
  });