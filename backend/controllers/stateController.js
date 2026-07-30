import State from "../models/State.js";

// =========================
// Get All States
// =========================

export const getAllStates = async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      total: states.length,
      data: states,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get State By Id
// =========================

export const getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({
        success: false,
        message: "State not found",
      });
    }

    res.json({
      success: true,
      data: state,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Create State
// =========================

export const createState = async (req, res) => {
  try {
    const state = await State.create(req.body);

    res.status(201).json({
      success: true,
      data: state,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Update State
// =========================

export const updateState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      data: state,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Delete State
// =========================

export const deleteState = async (req, res) => {
  try {
    await State.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "State deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};