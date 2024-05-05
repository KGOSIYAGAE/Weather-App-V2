import React from "react";
import "./DayHighlights.css";

export default function DayHighlights({ data }) {
  /* UVIndex, windSpeed, windGust, windDirection, sunrise, sunset, humidity, visibility */
  return (
    <section className="current-day">
      <span className="current-day-title">Today's Highlights</span>
      <div className="current-day-grid">
        <div className="day-info-box">
          <span className="day-box-title">UV Index</span>
          <div className="uvi-box">
            <img src={() => `/icons/uv_${Math.floor(data.UVIndex)}.svg`} alt="windsock" className="uvi-icon" />
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
              <span className="wind-d-text">{data.windDirection}</span>
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
          <div className="humidity-details">
            <span className="humidity-total">{data.humidity}</span>
            <span>%</span>
          </div>
          <div className="humidity-description">
            <img src="/icons/raindrop.svg" alt="windsock" className="daily-weather-icon" />
          </div>
        </div>
        {/* */}
        <div className="day-info-box">
          <span className="day-box-title">Visibility</span>
          <div className="visibility-details">
            <span className="visibility-distance">{() => data.visibility / 1000}</span>
            <span>km</span>
          </div>

          <span className="">Average 😉</span>
        </div>
        {/* */}
        <div className="day-info-box">
          <span className="day-box-title">Air Quality</span>
          <div className="air-details">
            <span className="air-qaulity"></span>
            <span></span>
          </div>
          <div className="air-description">
            <img src="/icons/pressure_low.svg" alt="windsock" className="daily-weather-icon" />
          </div>
        </div>
      </div>
    </section>
  );
}
