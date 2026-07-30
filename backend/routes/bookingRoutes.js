import express from "express";

import {
  createBooking,
  getMyBookings,
  getAllBookings,
  deleteBooking,
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router =
  express.Router();

// Create booking
router.post(
  "/",
  authMiddleware,
  createBooking
);

// My bookings
router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);

// Admin all bookings
router.get(
  "/all",
  authMiddleware,
  getAllBookings
);

// Delete booking
router.delete(
  "/:id",
  authMiddleware,
  deleteBooking
);

export default router;