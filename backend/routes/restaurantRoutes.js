import express from "express";

import {
  getAllRestaurants,
  getRestaurantsByState,
  getRestaurantsByCity,
  getRestaurantById,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", getAllRestaurants);

router.get("/state/:stateId", getRestaurantsByState);

router.get("/city/:cityId", getRestaurantsByCity);

router.get("/:id", getRestaurantById);

export default router;