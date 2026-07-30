import Hotel from "../models/Hotel.js";
import Restaurant from "../models/Restaurant.js";
import State from "../models/State.js";
import City from "../models/City.js";

/*
  Helper:
  State name se State document find karega.
*/
const findState = async (stateName) => {
  if (!stateName) return null;

  return await State.findOne({
    name: {
      $regex: `^${stateName.trim()}$`,
      $options: "i",
    },
  });
};

/*
  Helper:
  City name se City document find karega.
*/
const findCity = async (cityName) => {
  if (!cityName) return null;

  return await City.findOne({
    name: {
      $regex: `^${cityName.trim()}$`,
      $options: "i",
    },
  });
};


/* =====================================================
   HOTEL PARTNER SUBMISSION
===================================================== */

export const submitHotelPartner = async (req, res) => {
  try {
    const {
      hotelName,
      description,
      stateName,
      cityName,
      address,
      images,
      rating,
      pricePerNight,
      amenities,
      ownerName,
      ownerPhone,
      ownerEmail,
      website,
      googleMap,
      openTime,
      closeTime,
    } = req.body;

    if (
      !hotelName ||
      !stateName ||
      !address ||
      !pricePerNight ||
      !ownerName ||
      !ownerPhone ||
      !ownerEmail
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required hotel and owner details.",
      });
    }

    const state = await findState(stateName);

    if (!state) {
      return res.status(404).json({
        success: false,
        message: `State "${stateName}" was not found in TRIPO database.`,
      });
    }

    const city = await findCity(cityName);

    /*
      IMPORTANT:
      New partner listings are ALWAYS pending.
      They will not appear on customer side
      until admin verification.
    */

    const hotel = await Hotel.create({
      hotelName: hotelName.trim(),

      description: description || "",

      state: state._id,

      city: city ? city._id : null,

      address: address.trim(),

      images: Array.isArray(images) ? images : [],

      rating: Number(rating) || 0,

      pricePerNight: Number(pricePerNight),

      amenities: Array.isArray(amenities)
        ? amenities
        : [],

      ownerName: ownerName.trim(),

      ownerPhone: ownerPhone.trim(),

      ownerEmail: ownerEmail.trim().toLowerCase(),

      website: website || "",

      googleMap: googleMap || "",

      openTime: openTime || "24 Hours",

      closeTime: closeTime || "24 Hours",

      isPartner: true,

      isApproved: false,

      commissionPercentage: 10,

      status: "pending",
    });

    res.status(201).json({
      success: true,
      message:
        "Hotel partner application submitted successfully. Waiting for TRIPO verification.",
      data: hotel,
    });

  } catch (error) {
    console.error(
      "Hotel partner submission error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to submit hotel partner application.",
    });
  }
};


/* =====================================================
   RESTAURANT PARTNER SUBMISSION
===================================================== */

export const submitRestaurantPartner = async (req, res) => {
  try {
    const {
      restaurantName,
      description,
      stateName,
      cityName,
      address,
      images,
      rating,
      averageCost,
      cuisine,
      ownerName,
      ownerPhone,
      ownerEmail,
      website,
      googleMap,
      openTime,
      closeTime,
    } = req.body;

    if (
      !restaurantName ||
      !stateName ||
      !address ||
      !ownerName ||
      !ownerPhone ||
      !ownerEmail
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required restaurant and owner details.",
      });
    }

    const state = await findState(stateName);

    if (!state) {
      return res.status(404).json({
        success: false,
        message: `State "${stateName}" was not found in TRIPO database.`,
      });
    }

    const city = await findCity(cityName);

    const restaurant = await Restaurant.create({
      restaurantName: restaurantName.trim(),

      description: description || "",

      state: state._id,

      city: city ? city._id : null,

      address: address.trim(),

      images: Array.isArray(images) ? images : [],

      rating: Number(rating) || 0,

      averageCost: Number(averageCost) || 0,

      cuisine: Array.isArray(cuisine)
        ? cuisine
        : [],

      ownerName: ownerName.trim(),

      ownerPhone: ownerPhone.trim(),

      ownerEmail: ownerEmail.trim().toLowerCase(),

      website: website || "",

      googleMap: googleMap || "",

      openTime: openTime || "10:00 AM",

      closeTime: closeTime || "11:00 PM",

      isPartner: true,

      isApproved: false,

      commissionPercentage: 10,

      status: "pending",
    });

    res.status(201).json({
      success: true,
      message:
        "Restaurant partner application submitted successfully. Waiting for TRIPO verification.",
      data: restaurant,
    });

  } catch (error) {
    console.error(
      "Restaurant partner submission error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to submit restaurant partner application.",
    });
  }
};


/* =====================================================
   ADMIN — PENDING HOTELS
===================================================== */

export const getPendingHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({
      isPartner: true,
      isApproved: false,
      status: "pending",
    })
      .populate("state", "name capital")
      .populate("city", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });

  } catch (error) {
    console.error(
      "Pending hotels error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch pending hotels.",
    });
  }
};


/* =====================================================
   ADMIN — PENDING RESTAURANTS
===================================================== */

export const getPendingRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      isPartner: true,
      isApproved: false,
      status: "pending",
    })
      .populate("state", "name capital")
      .populate("city", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });

  } catch (error) {
    console.error(
      "Pending restaurants error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch pending restaurants.",
    });
  }
};


/* =====================================================
   ADMIN — APPROVE HOTEL
===================================================== */

export const approveHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findByIdAndUpdate(
      id,
      {
        isApproved: true,
        status: "active",
        isPartner: true,
      },
      {
        new: true,
      }
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hotel approved successfully.",
      data: hotel,
    });

  } catch (error) {
    console.error(
      "Approve hotel error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to approve hotel.",
    });
  }
};


/* =====================================================
   ADMIN — APPROVE RESTAURANT
===================================================== */

export const approveRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant =
      await Restaurant.findByIdAndUpdate(
        id,
        {
          isApproved: true,
          status: "active",
          isPartner: true,
        },
        {
          new: true,
        }
      );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Restaurant approved successfully.",
      data: restaurant,
    });

  } catch (error) {
    console.error(
      "Approve restaurant error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to approve restaurant.",
    });
  }
};