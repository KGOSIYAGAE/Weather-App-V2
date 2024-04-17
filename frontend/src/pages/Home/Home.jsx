import "./Home.css";
import { LuSearch } from "react-icons/lu";
import { IoLocateOutline } from "react-icons/io5";
import { WeatherSvg } from "weather-icons-animated";
import { WiCloud } from "react-icons/wi";
import { GiHeavyRain } from "react-icons/gi";
import "@fontsource/roboto/";
import { useState } from "react";
import axios from "axios";

import React from "react";

export default function Home() {
  const [cityName, setCityName] = useState("");
  const [temp, setTemp] = useState(0);
  const [timeZone, setTimeZone] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [rainPercent, setRainPercent] = useState();

  const options = {
    weekday: "long",
  };

  const handleWeatherSearch = () => {
    const data = { cityName };

    axios
      .post("http://localhost:3000/weather", data)
      .then((response) => {
        console.log("Success.");
        setTemp(response.data.current.temp);
        setTimeZone(response.data.timezone);
        setWeatherDescription(response.data.current.weather[0].description);
        response.data.hasOwnProperty("minutely") ? setRainPercent(response.data.minutely[0].precipitation + " %") : setRainPercent("No Info Available");

        console.log(response);
      })
      .catch((error) => {
        alert("There was an error, check console.");
        console.log(error);
        console.log(data);
      });
  };

  return (
    <body>
      <div className="app-container">
        <div className="left">
          <div className="search-bar">
            <LuSearch className="search-icon-1" />
            <input type="text" placeholder="Search for places ..." className="search-input" value={cityName} onChange={(e) => setCityName(e.target.value)} />
            <button className="search-button" onClick={handleWeatherSearch}>
              <IoLocateOutline className="search-icon-2" />
            </button>
          </div>
          <div className="weather-info">
            <section className="info-section-a">
              <WeatherSvg state="pouring" width={200} height={200} />
              <div className="info-temp">
                <span className="weather-temp-txt">{Math.floor(temp)}</span>
                <span className="degress-icon">°C</span>
              </div>
              <div className="info-date">
                <span className="info-day">{new Date().toLocaleDateString({ timeZone }, options)},</span>
                <span className="info-time">{new Date().toLocaleTimeString([], { timeZone: "Africa/Johannesburg", hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </section>
            <section className="info-section-b">
              <div className="info-description">
                <WiCloud className="description-icon" />
                <span className="description-text">{weatherDescription}</span>
              </div>
              <div className="info-description">
                <GiHeavyRain className="rain-icon" />
                <span className="rain-text">Rain - {rainPercent}</span>
              </div>
            </section>
          </div>
        </div>
        <div className="right">Right</div>
      </div>
    </body>
  );
}
