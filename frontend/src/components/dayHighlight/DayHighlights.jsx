import React from "react";
import "./DayHighlights.css";
import Pressure from "../Pressure/Pressure";

export default function DayHighlights({ data }) {
  const handleUVIIcon = (UVIndex) => {
    return UVIndex <= 11 ? `/icons/uv_${Math.floor(UVIndex)}.svg` : `/icons/uv_12_15.png`;
  };

  const handleVisibility = (visibility) => {
    return visibility / 1000;
  };

  const handleWindDirectin = (wind_deg) => {
    console.log(wind_deg);
    switch (true) {
      case wind_deg > 0 && wind_deg < 44:
        return "N";
        break;
      case wind_deg >= 45 && wind_deg <= 89:
        return "NE";
        break;

      case wind_deg >= 90 && wind_deg <= 134:
        return "E";
        break;
      case wind_deg >= 135 && wind_deg <= 179:
        return "SE";
        break;

      case wind_deg >= 180 && wind_deg <= 224:
        return "S";
        break;

      case wind_deg >= 225 && wind_deg <= 269:
        return "SW";
        break;

      case wind_deg >= 270 && wind_deg <= 314:
        return "W";
        break;

      case wind_deg >= 315 && wind_deg <= 360:
        return "NW";
        break;

      default:
        return "N/A";
        break;
    }
  };

  const handleHumidityDescription = (humidity_perc) => {
    switch (true) {
      case humidity_perc <= 30:
        return "Humidity is Low. 😉";
        break;
      case humidity_perc > 30 && humidity_perc <= 60:
        return "Humidity Is Average. 👍";
        break;

      case humidity_perc > 60 && humidity_perc <= 100:
        return "Humidity Is High. 😥";
        break;

      default:
        return "N/A";
        break;
    }
  };

  const handleVisibilityDescription = (visibility) => {
    visibility = visibility / 1000;

    switch (true) {
      case visibility <= 1:
        return "Thick Fog. 🔦";
        break;
      case visibility >= 1.9 && visibility <= 2:
        return "Thin Fog/ Heavy Rain. ⛈️";
        break;
      case visibility >= 5.9 && visibility <= 10:
        return "Light Haze/ Light Rain. 🥲";
        break;
      case visibility >= 18 && visibility <= 20:
        return "Clear. 👍";
        break;
      case visibility >= 23 && visibility <= 50:
        return "Very Clear. 😉";
        break;

      default:
        return "N/A";
        break;
    }
  };

  const handlePressureDescription = (pressure) => {
    switch (true) {
      case pressure >= 1020:
        return "Pressure is High";
        break;
      case pressure <= 1000 && pressure >= 980:
        return "Pressure is Low";
        break;

      default:
        return "Pressure is Very Low";
        break;
    }
  };

  const handlePressureIcon = (pressure) => {
    switch (true) {
      case pressure >= 1020:
        return "../public/icons/pressure_high.svg";
        break;
      case pressure <= 1000 && pressure >= 980:
        return "../public/icons/pressure_low.svg";
        break;

      default:
        return "../public/icons/pressure_low.svg";
        break;
    }
  };

  return (
    <section className="current-day">
      <span className="current-day-title">Today's Highlights</span>
      <div className="current-day-grid">
        <div className="day-info-box">
          <span className="day-box-title">UV Index</span>
          <div className="uvi-box">
            <img src={handleUVIIcon(data.UVIndex)} alt="windsock" className="uvi-icon" />
          </div>
        </div>
        {/* */}
        <div className="day-info-box">
          <span className="day-box-title">Wind Status</span>
          <div className="wind-box">
            <div className="wind-details">
              <div className="wind-details-wind">
                <span className="wind-speed">{data.windSpeed}</span>
                <div className="wind-speed-text">
                  <span>KM/H</span>
                  <span>Wind</span>
                </div>
              </div>
              <div className="wind-details-gust">
                <span className="wind-speed">{data.windGust}</span>
                <div className="wind-speed-text">
                  <span>KM/H</span>
                  <span>Gust</span>
                </div>
              </div>
            </div>
            <div className="wind-direction">
              <img src="../public/icons/compass.svg" alt="windsock" className="compass-icon" />
              <span className="wind-d-text">{handleWindDirectin(data.wind_deg)}</span>
            </div>
          </div>
        </div>

        {/* */}
        <div className="day-info-box">
          <span className="day-box-title">Sunrise & Sunset</span>
          <div className="sunrise">
            <img src="/icons/sunrise.svg" alt="windsock" className="daily-weather-icon" />
            <span>{new Date(data.sunrise * 1000).toLocaleTimeString({ timezone: "Africa/Johannesburg" })}</span>
          </div>
          <div className="sunrise">
            <img src="/icons/sunset.svg" alt="windsock" className="daily-weather-icon" />
            <span>{new Date(data.sunset * 1000).toLocaleTimeString({ timezone: "Africa/Johannesburg" })}</span>
          </div>
        </div>
        {/* */}
        <div className="day-info-box">
          <span className="day-box-title">Humidity</span>
          <div className="humidity-container">
            <div className="humidity-details">
              <span className="humidity-total">{data.humidity}</span>
              <span>%</span>
            </div>
            <span className="">{handleHumidityDescription(data.humidity)}</span>
          </div>
        </div>
        {/* */}
        <div className="day-info-box">
          <span className="day-box-title">Visibility</span>
          <div className="visibility-details">
            <span className="visibility-distance">{handleVisibility(data.visibility)}</span>
            <span>km</span>
          </div>
          <span className="">{handleVisibilityDescription(data.visibility)}</span>
        </div>
        {/* */}
        <div className="day-info-box">
          <span className="day-box-title">Pressure</span>
          <div className="pressure-container">
            <span className="pressure-text">{data.pressure}</span>
            <span>hPa</span>
          </div>
          <div className="p-items">
            <img src={handlePressureIcon(data.pressure)} alt="pressure" className="p-icon" />
            <span>{handlePressureDescription(data.pressure)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
