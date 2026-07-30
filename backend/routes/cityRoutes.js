import express from "express";

import {

  getAllCities,

  getCityById,

  createCity,

  updateCity,

  deleteCity,

} from "../controllers/cityController.js";

const router = express.Router();

// Get All Cities
router.get("/", getAllCities);

// Get Single City
router.get("/:id", getCityById);

// Add City
router.post("/", createCity);

// Update City
router.put("/:id", updateCity);

// Delete City
router.delete("/:id", deleteCity);

export default router;