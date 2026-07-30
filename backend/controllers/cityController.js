import City from "../models/City.js";

// =============================
// Get All Cities
// =============================

export const getAllCities = async (req, res) => {

  try {

    const cities = await City.find()
      .populate("state")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      total: cities.length,
      data: cities,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// =============================
// Get City By ID
// =============================

export const getCityById = async (req, res) => {

  try {

    const city = await City.findById(req.params.id)
      .populate("state");

    if (!city) {

      return res.status(404).json({
        success: false,
        message: "City Not Found",
      });

    }

    res.json({
      success: true,
      data: city,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// =============================
// Add City
// =============================

export const createCity = async (req, res) => {

  try {

    const city = await City.create(req.body);

    res.status(201).json({
      success: true,
      data: city,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// =============================
// Update City
// =============================

export const updateCity = async (req, res) => {

  try {

    const city = await City.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: city,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// =============================
// Delete City
// =============================

export const deleteCity = async (req, res) => {

  try {

    await City.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "City Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};