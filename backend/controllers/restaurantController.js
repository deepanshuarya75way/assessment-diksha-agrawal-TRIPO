import Restaurant from "../models/Restaurant.js";

// GET all approved active restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      isApproved: true,
      status: "active",
    })
      .populate("state", "name capital")
      .populate("city", "name")
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    console.error("Get all restaurants error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch restaurants",
    });
  }
};

// GET restaurants by state
export const getRestaurantsByState = async (req, res) => {
  try {
    const { stateId } = req.params;

    const restaurants = await Restaurant.find({
      state: stateId,
      isApproved: true,
      status: "active",
    })
      .populate("state", "name capital")
      .populate("city", "name")
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    console.error("Get restaurants by state error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch restaurants for this state",
    });
  }
};

// GET restaurants by city
export const getRestaurantsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    const restaurants = await Restaurant.find({
      city: cityId,
      isApproved: true,
      status: "active",
    })
      .populate("state", "name capital")
      .populate("city", "name")
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    console.error("Get restaurants by city error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch restaurants for this city",
    });
  }
};

// GET single restaurant
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
      _id: id,
      isApproved: true,
      status: "active",
    })
      .populate("state", "name capital")
      .populate("city", "name");

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    console.error("Get restaurant error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch restaurant",
    });
  }
};