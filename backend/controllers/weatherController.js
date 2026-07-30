import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required"
      });
    }

    if (!process.env.WEATHER_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Weather API key is missing"
      });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.WEATHER_API_KEY,
          units: "metric"
        }
      }
    );

    const data = response.data;

    res.json({
      success: true,

      data: {
        city: data.name,
        country: data.sys?.country,

        temperature: Math.round(data.main?.temp ?? 0),

        feelsLike: Math.round(
          data.main?.feels_like ?? 0
        ),

        minTemperature: Math.round(
          data.main?.temp_min ?? 0
        ),

        maxTemperature: Math.round(
          data.main?.temp_max ?? 0
        ),

        humidity: data.main?.humidity ?? 0,

        pressure: data.main?.pressure ?? 0,

        windSpeed: data.wind?.speed ?? 0,

        condition:
          data.weather?.[0]?.main || "Unknown",

        description:
          data.weather?.[0]?.description || "",

        icon:
          data.weather?.[0]?.icon || "01d"
      }
    });

  } catch (error) {
    console.log(
      "Weather API Error:",
      error.response?.data || error.message
    );

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "Weather data not found for this city"
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to fetch weather data"
    });
  }
};