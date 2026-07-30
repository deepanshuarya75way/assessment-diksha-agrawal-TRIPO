import Booking from "../models/Booking.js";

// =====================================
// CREATE BOOKING
// =====================================

export const createBooking = async (
  req,
  res
) => {
  try {
    const {
      touristPlace,
      customerName,
      customerEmail,
      customerPhone,
      members,
      checkIn,
      checkOut,
      totalAmount,
    } = req.body;

    if (
      !touristPlace ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !members ||
      !checkIn ||
      !checkOut ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all booking details.",
      });
    }

    const booking =
      await Booking.create({
        user: req.user._id,

        touristPlace,

        customerName:
          customerName.trim(),

        customerEmail:
          customerEmail.trim(),

        customerPhone:
          customerPhone.trim(),

        members:
          Number(members),

        checkIn,

        checkOut,

        totalAmount:
          Number(totalAmount),

        // Payment abhi nahi hua
        paymentStatus:
          "pending",

        bookingStatus:
          "pending",

        razorpayOrderId: "",

        razorpayPaymentId: "",

        invoiceNumber: "",
      });

    return res.status(201).json({
      success: true,

      message:
        "Booking created successfully.",

      data: booking,
    });
  } catch (err) {
    console.error(
      "Create booking error:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Booking could not be created.",
    });
  }
};

// =====================================
// MY BOOKINGS
// =====================================

export const getMyBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await Booking.find({
        user: req.user._id,
      })
        .populate("touristPlace")
        .sort({
          createdAt: -1,
        });

    return res.json({
      success: true,
      total: bookings.length,
      data: bookings,
    });
  } catch (err) {
    console.error(
      "Get my bookings error:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================
// ADMIN ALL BOOKINGS
// =====================================

export const getAllBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await Booking.find()
        .populate("user")
        .populate("touristPlace")
        .sort({
          createdAt: -1,
        });

    return res.json({
      success: true,
      total: bookings.length,
      data: bookings,
    });
  } catch (err) {
    console.error(
      "Get all bookings error:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================
// DELETE BOOKING
// =====================================

export const deleteBooking = async (
  req,
  res
) => {
  try {
    const booking =
      await Booking.findByIdAndDelete(
        req.params.id
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message:
          "Booking Not Found",
      });
    }

    return res.json({
      success: true,
      message:
        "Booking Deleted Successfully",
    });
  } catch (err) {
    console.error(
      "Delete booking error:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};