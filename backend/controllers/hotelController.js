import Hotel from "../models/Hotel.js";

// GET all approved active hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({
      isApproved: true,
      status: "active",
    })
      .populate("state", "name capital")
      .populate("city", "name")
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error("Get all hotels error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch hotels",
    });
  }
};

// GET hotels by state
export const getHotelsByState = async (req, res) => {
  try {
    const { stateId } = req.params;

    const hotels = await Hotel.find({
      state: stateId,
      isApproved: true,
      status: "active",
    })
      .populate("state", "name capital")
      .populate("city", "name")
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error("Get hotels by state error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch hotels for this state",
    });
  }
};

// GET hotels by city
export const getHotelsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    const hotels = await Hotel.find({
      city: cityId,
      isApproved: true,
      status: "active",
    })
      .populate("state", "name capital")
      .populate("city", "name")
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error("Get hotels by city error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch hotels for this city",
    });
  }
};

// GET single hotel
export const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findOne({
      _id: id,
      isApproved: true,
      status: "active",
    })
      .populate("state", "name capital")
      .populate("city", "name");

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error("Get hotel error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch hotel",
    });
  }
};