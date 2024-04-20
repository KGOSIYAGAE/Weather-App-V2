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
  const [UVIndex, setUVIndex] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [locationDate, setLocationDate] = useState(0);

  const [dailyWeather, setDailyWeather] = useState([]);
  const [dayDate, setDayDate] = useState(0);
  const [dayTemp, setDayTemp] = useState(0);
  const [nightTemp, setNightTemp] = useState(0);
  const [dayWeatherIcon, setDayWeatherIcon] = useState("");

  const dayOptions = {
    weekday: "long",
  };

  const timeOptions = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };

  const hadnleWeatherIcon = (weatherIcon) => {
    switch (weatherIcon) {
      case "01d":
        setWeatherIcon("sunny");
        break;
      case "01n":
        setWeatherIcon("clear-night");
        break;

      case "02d":
        setWeatherIcon("partlycloudy");
        break;
      case "02n":
        setWeatherIcon("partlycloudy");
        break;

      case "03d":
        setWeatherIcon("cloudy");
        break;
      case "03n":
        setWeatherIcon("partlycloudy");
        break;

      case "04d":
        setWeatherIcon("cloudy");
        break;
      case "04n":
        setWeatherIcon("cloudy");
        break;

      case "09d":
        setWeatherIcon("pouring");
        break;
      case "09n":
        setWeatherIcon("pouring");
        break;

      case "10d":
        setWeatherIcon("rainy");
        break;
      case "10n":
        setWeatherIcon("rainy");
        break;

      case "11d":
        setWeatherIcon("lightning-rainy");
        break;
      case "11n":
        setWeatherIcon("lightning-rainy");
        break;

      case "13d":
        setWeatherIcon("snowy");
        break;
      case "13n":
        setWeatherIcon("snowy");
        break;

      case "50d":
        setWeatherIcon("snowy");
        break;
      case "50n":
        setWeatherIcon("snowy");
        break;

      default:
        setWeatherIcon("None");
        break;
    }
  };

  const handleWeatherSearch = async () => {
    const data = { cityName };

    await axios
      .post("http://localhost:3000/weather", data)
      .then((response) => {
        setTemp(response.data.current.temp);
        setTimeZone(response.data.timezone);
        setWeatherDescription(response.data.current.weather[0].description);
        setUVIndex(response.data.current.uvi);
        setWindSpeed(response.data.current.wind_speed);
        setSunrise(response.data.current.sunrise);
        setSunset(response.data.current.sunset);
        setHumidity(response.data.current.humidity);
        setVisibility(response.data.current.visibility);
        setLocationDate(response.data.current.dt);

        {
          /*Day Details*/
        }
        setDailyWeather(...response.data.daily);
        console.log(dailyWeather);
        /*setDayTemp();
        setNightTemp();
        setDayWeatherIcon();*/

        response.data.hasOwnProperty("minutely") ? setRainPercent(response.data.minutely[0].precipitation + " %") : setRainPercent("No Info Available");
        hadnleWeatherIcon(response.data.current.weather[0].icon);

        console.log(response);
        console.log(weatherIcon);
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
        {/*Left Side section*/}
        <section className="left">
          <div className="search-bar">
            <LuSearch className="search-icon-1" />
            <input type="text" placeholder="Search for places ..." className="search-input" value={cityName} onChange={(e) => setCityName(e.target.value)} />
            <button className="search-button" onClick={handleWeatherSearch}>
              <IoLocateOutline className="search-icon-2" />
            </button>
          </div>
          <div className="weather-info">
            <section className="info-section-a">
              <WeatherSvg state={weatherIcon} width={180} height={180} />
              <div className="info-temp">
                <span className="weather-temp-txt">{Math.floor(temp)}</span>
                <span className="degress-icon">°C</span>
              </div>
              <div className="info-date">
                <span className="info-day">{new Date().toLocaleDateString({ timeZone }, dayOptions)},</span>
                <span className="info-time">{new Date().toLocaleTimeString([], { timezone: "Africa/Johannesburg" }, timeOptions)}</span>
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
              <div className="image-box">
                <img src="../public/new_york.jpg" alt="" className="city-image" />
                <h4 className="city-name-txt">{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</h4>
              </div>
            </section>
          </div>
        </section>

        {/*Right Side section*/}
        <section className="right">
          <div className="right-container">
            {/*Nav section*/}
            <section className="nav">
              <div className="tabs-section">
                <span className="tab-title-today">Today</span>
                <span className="tab-title-week">Week</span>
              </div>
              <div className="display-mode"></div>
            </section>

            {/*Grid section*/}
            <section className="days-grid">
              {dailyWeather.map((item) => (
                <div key={item.id} book={item} />
              ))}

              {/*Code repeat
              <div className="box">
                <span className="box-title">Mon</span>
                <div className="box-icon-container">
                  <WeatherSvg state="rainy" width={60} height={60} />
                </div>
                <span className="box-temp-txt">
                  15° <span className="box-temp-txt2">-1°</span>
                </span>
              </div>
              <div className="box">
                <span className="box-title">Tue</span>
                <div className="box-icon-container">
                  <WeatherSvg state="pouring" width={60} height={60} />
                </div>
                <span className="box-temp-txt">
                  15° <span className="box-temp-txt2">-1°</span>
                </span>
              </div>
              <div className="box">
                <span className="box-title">Wed</span>
                <div className="box-icon-container">
                  <WeatherSvg state="sunny" width={60} height={60} />
                </div>
                <span className="box-temp-txt">
                  15° <span className="box-temp-txt2">-1°</span>
                </span>
              </div>
              <div className="box">
                <span className="box-title">Thu</span>
                <div className="box-icon-container">
                  <WeatherSvg state="lightning" width={60} height={60} />
                </div>
                <span className="box-temp-txt">
                  15° <span className="box-temp-txt2">-1°</span>
                </span>
              </div>
              <div className="box">
                <span className="box-title">Fri</span>
                <div className="box-icon-container">
                  <WeatherSvg state="windy" width={60} height={60} />
                </div>
                <span className="box-temp-txt">
                  15° <span className="box-temp-txt2">-1°</span>
                </span>
              </div>
              <div className="box">
                <span className="box-title">Sat</span>
                <div className="box-icon-container">
                  <WeatherSvg state="snowy" width={60} height={60} />
                </div>
                <span className="box-temp-txt">
                  15° <span className="box-temp-txt2">-1°</span>
                </span>
              </div>
              {/*Code repeat*
              */}
            </section>
          </div>
        </section>
      </div>
    </body>
  );
}
