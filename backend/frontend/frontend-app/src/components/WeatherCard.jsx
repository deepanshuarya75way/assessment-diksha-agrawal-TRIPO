import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5000";

function WeatherCard({ city }) {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!city) return;

    fetchWeather();

  }, [city]);

  const fetchWeather = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API}/api/weather`,
        {
          params: {
            city
          }
        }
      );

      setWeather(response.data.data);

    } catch (err) {

      console.log("Weather Error:", err);

      setWeather(null);

      setError(
        err.response?.data?.message ||
        "Weather unavailable"
      );

    } finally {

      setLoading(false);

    }
  };

  if (!city) return null;

  return (
    <div
      style={{
        marginTop: "25px",
        padding: "25px",
        borderRadius: "20px",
        background:
          "linear-gradient(135deg,#0ea5e9,#2563eb)",
        color: "#fff",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.2)"
      }}
    >

      <h2>
        🌤️ Weather in {city}
      </h2>

      {loading && (
        <p>Loading live weather...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {weather && !loading && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}
          >

            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
              style={{
                width: "80px",
                height: "80px"
              }}
            />

            <div>
              <h1 style={{ margin: 0 }}>
                {weather.temperature}°C
              </h1>

              <p
                style={{
                  margin: "5px 0",
                  textTransform: "capitalize"
                }}
              >
                {weather.description}
              </p>
            </div>

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(140px,1fr))",
              gap: "12px",
              marginTop: "20px"
            }}
          >

            <WeatherInfo
              title="Feels Like"
              value={`${weather.feelsLike}°C`}
            />

            <WeatherInfo
              title="Humidity"
              value={`${weather.humidity}%`}
            />

            <WeatherInfo
              title="Wind"
              value={`${weather.windSpeed} m/s`}
            />

            <WeatherInfo
              title="Min Temp"
              value={`${weather.minTemperature}°C`}
            />

            <WeatherInfo
              title="Max Temp"
              value={`${weather.maxTemperature}°C`}
            />

            <WeatherInfo
              title="Pressure"
              value={`${weather.pressure} hPa`}
            />

          </div>

        </>
      )}

    </div>
  );
}

function WeatherInfo({ title, value }) {

  return (
    <div
      style={{
        padding: "15px",
        borderRadius: "12px",
        background: "rgba(255,255,255,.15)"
      }}
    >
      <small>{title}</small>

      <strong
        style={{
          display: "block",
          marginTop: "5px",
          fontSize: "18px"
        }}
      >
        {value}
      </strong>

    </div>
  );
}

export default WeatherCard;