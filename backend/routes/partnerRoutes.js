import express from "express";

import {
  submitHotelPartner,
  submitRestaurantPartner,
  getPendingHotels,
  getPendingRestaurants,
  approveHotel,
  approveRestaurant,
} from "../controllers/partnerController.js";

const router = express.Router();

/*
  PARTNER APPLICATIONS
*/

router.post(
  "/hotels",
  submitHotelPartner
);

router.post(
  "/restaurants",
  submitRestaurantPartner
);


/*
  ADMIN — PENDING LISTINGS
*/

router.get(
  "/admin/hotels/pending",
  getPendingHotels
);

router.get(
  "/admin/restaurants/pending",
  getPendingRestaurants
);


/*
  ADMIN — APPROVAL
*/

router.patch(
  "/admin/hotels/:id/approve",
  approveHotel
);

router.patch(
  "/admin/restaurants/:id/approve",
  approveRestaurant
);

export default router;