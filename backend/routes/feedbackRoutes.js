import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

/* =========================
   SUBMIT FEEDBACK
========================= */

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      rating,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !rating ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all feedback fields.",
      });
    }

    const feedback = await Feedback.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      rating: Number(rating),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (error) {
    console.error(
      "❌ Feedback Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to submit feedback.",
    });
  }
});

export default router;