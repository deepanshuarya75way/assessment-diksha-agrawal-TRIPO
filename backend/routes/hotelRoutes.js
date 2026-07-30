import express from "express";

import {
  getAllHotels,
  getHotelsByState,
  getHotelsByCity,
  getHotelById,
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getAllHotels);

router.get("/state/:stateId", getHotelsByState);

router.get("/city/:cityId", getHotelsByCity);

router.get("/:id", getHotelById);

export default router;