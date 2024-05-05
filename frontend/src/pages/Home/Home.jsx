import "./Home.css";
import { LuSearch } from "react-icons/lu";
import { IoLocateOutline } from "react-icons/io5";
import { WeatherSvg } from "weather-icons-animated";
import { WiCloud } from "react-icons/wi";
import { GiHeavyRain } from "react-icons/gi";
import "@fontsource/roboto/";
import { useState } from "react";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import React from "react";
import DayHighlights from "../../components/dayHighlight/DayHighlights";
import WeekHighlight from "../../components/WeekHighlight/WeekHighlight";

export default function Home() {
  const [cityName, setCityName] = useState("");

  //current data
  const [temp, setTemp] = useState(0);
  const [timeZone, setTimeZone] = useState("Africa/Johannesburg");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [rainPercent, setRainPercent] = useState();
  const [locationDate, setLocationDate] = useState(0);

  //daily data
  const [UVIndex, setUVIndex] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windGust, setWindGust] = useState(0);
  const [windDirection, setWindDirection] = useState("");
  const [wind_deg, setWind_deg] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [pressure, setPressure] = useState(0);

  //Daily data
  const [dailyWeather, setDailyWeather] = useState([]);
  const [dayDate, setDayDate] = useState(0);
  const [dayTemp, setDayTemp] = useState(0);
  const [nightTemp, setNightTemp] = useState(0);
  const [dayIcon, setDayIcon] = useState("");

  //Tab
  const [tab, setTab] = useState("Today");

  const dayOptions = {
    weekday: "long",
  };

  const timeOptions = {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };

  const hadnleWeatherIcon = (weatherIcon) => {
    switch (weatherIcon) {
      case "01d":
        setWeatherIcon("../public/icons/clear_day.svg");
        break;
      case "01n":
        setWeatherIcon("../public/icons/clear_night.svg");
        break;

      case "02d":
        setWeatherIcon("../public/icons/partly_cloudy_day.svg");
        break;
      case "02n":
        setWeatherIcon("../public/icons/partly_cloudy_night.svg");
        break;

      case "03d":
        setWeatherIcon("../public/icons/cloudy.svg");
        break;
      case "03n":
        setWeatherIcon("../public/icons/cloudy.svg");
        break;

      case "04d":
        setWeatherIcon("../public/icons/overcast.svg");
        break;
      case "04n":
        setWeatherIcon("../public/icons/overcast.svg");
        break;

      case "09d":
        setWeatherIcon("../public/icons/rain.svg");
        break;
      case "09n":
        setWeatherIcon("../public/icons/rain.svg");
        break;

      case "10d":
        setWeatherIcon("../public/icons/partly_cloudy_day_rain.svg");
        break;
      case "10n":
        setWeatherIcon("../public/icons/partly_cloudy_night_rain.svg");
        break;

      case "11d":
        setWeatherIcon("../public/icons/thunderstorms_rain.svg");
        break;

      case "11n":
        setWeatherIcon("../public/icons/thunderstorms_rain.svg");
        break;

      case "13d":
        setWeatherIcon("../public/icons/snow.svg");
        break;
      case "13n":
        setWeatherIcon("../public/icons/snow.svg");
        break;

      case "50d":
        setWeatherIcon("../public/icons/mist.svg");
        break;
      case "50n":
        setWeatherIcon("../public/icons/mist.svg");
        break;

      default:
        setWeatherIcon("../public/icons/not_available.svg");
        break;
    }
  };

  /*
  const hadnleDayIcon = (weatherIcon) => {
    switch (weatherIcon) {
      case "01d":
        return "../public/icons/clear_day.svg";
        break;
      case "01n":
        return "../public/icons/clear_night.svg";
        break;

      case "02d":
        return "../public/icons/partly_cloudy_day.svg";
        break;
      case "02n":
        return "../public/icons/partly_cloudy_night.svg";
        break;

      case "03d":
        return "../public/icons/cloudy.svg";
        break;
      case "03n":
        return "../public/icons/cloudy.svg";
        break;

      case "04d":
        return "../public/icons/overcast.svg";
        break;
      case "04n":
        return "../public/icons/overcast.svg";
        break;

      case "09d":
        return "../public/icons/rain.svg";
        break;
      case "09n":
        return "../public/icons/rain.svg";
        break;

      case "10d":
        return "../public/icons/partly_cloudy_day_rain.svg";
        break;
      case "10n":
        return "../public/icons/partly_cloudy_night_rain.svg";
        break;

      case "11d":
        return "../public/icons/thunderstorms_rain.svg";
        break;

      case "11n":
        return "../public/icons/thunderstorms_rain.svg";
        break;

      case "13d":
        return "../public/icons/snow.svg";
        break;
      case "13n":
        return "../public/icons/snow.svg";
        break;

      case "50d":
        return "../public/icons/mist.svg";
        break;
      case "50n":
        return "../public/icons/mist.svg";
        break;

      default:
        return "../public/icons/not_available.svg";
        break;
    }
  };
*/

  const handleWindDirectin = (wind_deg) => {
    console.log(wind_deg);
    switch (true) {
      case wind_deg > 0 && wind_deg < 44:
        return setWindDirection("N");
        break;
      case wind_deg >= 45 && wind_deg <= 89:
        return setWindDirection("NE");
        break;

      case wind_deg >= 90 && wind_deg <= 134:
        return setWindDirection("E");
        break;
      case wind_deg >= 135 && wind_deg <= 179:
        return setWindDirection("SE");
        break;

      case wind_deg >= 180 && wind_deg <= 224:
        return setWindDirection("S");
        break;

      case wind_deg >= 225 && wind_deg <= 269:
        return setWindDirection("SW");
        break;

      case wind_deg >= 270 && wind_deg <= 314:
        return setWindDirection("W");
        break;

      case wind_deg >= 315 && wind_deg <= 360:
        return setWindDirection("NW");
        break;

      default:
        return setWindDirection("N/A");
        break;
    }
  };

  const handleWeatherSearch = async () => {
    const data = { cityName };

    await axios
      .post("http://localhost:3000/weather", data)
      .then((response) => {
        //Current weather data
        setTemp(response.data.current.temp);
        setTimeZone(response.data.timezone);
        setWeatherDescription(response.data.current.weather[0].description);
        setLocationDate(response.data.current.dt);

        //Day Highlight
        setWindSpeed(response.data.current.wind_speed);
        setWindGust(response.data.daily[0].wind_gust);
        setWind_deg(response.data.daily[0].wind_deg);
        setPressure(response.data.daily[0].pressure);
        setUVIndex(response.data.daily[0].uvi);
        setHumidity(response.data.daily[0].humidity);
        setRainPercent(response.data.daily[0].pop);
        setVisibility(response.data.current.visibility);
        setSunrise(response.data.current.sunrise);
        setSunset(response.data.current.sunset);

        //Week weather code
        setDailyWeather([...response.data.daily]);
        console.log(response.data);
        /*setDayTemp();
        setNightTemp();
        setDayWeatherIcon();*/

        handleWindDirectin(wind_deg);
        hadnleWeatherIcon(response.data.current.weather[0].icon);
      })
      .catch((error) => {
        alert("There was an error, check console.");
        console.log(error);
      });
  };

  const day = {
    UVIndex,
    windSpeed,
    windGust,
    windDirection,
    sunrise,
    sunset,
    humidity,
    visibility,
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
              {/*<WeatherSvg state={weatherIcon} width={180} height={180} />*/}
              <img className="section-a-img" src={weatherIcon === "" ? "../public/icons/not_available.svg" : weatherIcon}></img>
              <div className="info-temp">
                <span className="weather-temp-txt">{Math.floor(temp)}</span>
                <span className="degress-icon">°C</span>
              </div>
              <div className="info-date">
                <span className="info-day">{new Date().toLocaleDateString({ timeZone }, dayOptions)},</span>
                <span className="info-time">{new Date(locationDate * 1000).toLocaleTimeString({ timezone: "Africa/Johannesburg" })}</span>
              </div>
            </section>
            <section className="info-section-b">
              <div className="info-description">
                <WiCloud className="description-icon" />
                <span className="description-text">{weatherDescription}</span>
              </div>
              <div className="info-description">
                <img className="rain-icon" src="/icons/umbrella.svg"></img>
                <span className="rain-text">Rain - {rainPercent} %</span>
              </div>
              <div className="image-box">
                <img src="/new_york.jpg" alt="" className="city-image" />
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
                <span className="tab" onClick={() => setTab("Today")}>
                  Today
                </span>
                <span className="tab" onClick={() => setTab("Week")}>
                  Week
                </span>
              </div>
              <div className="display-mode"></div>
            </section>

            {tab === "Today" ? <DayHighlights data={day} /> : <WeekHighlight dailyWeather={dailyWeather} timeZone={timeZone} />}

            {/*Grid section
            <section className="days-grid">
              {dailyWeather.slice(1).map((day) => (
                <div key={day.dt} className="box">
                  <span className="box-title">{new Date(day.dt * 1000).toLocaleDateString({ timeZone }, dayOptions)}</span>
                  <div className="box-icon-container">
                    {/*<WeatherSvg state={} width={60} height={60} />
                    <img className="daily-weather-icon" src={hadnleDayIcon(day.weather[0].icon)}></img>
                  </div>
                  <span className="box-temp-txt">
                    {Math.floor(day.temp.day)}°<span className="box-temp-txt2">{Math.floor(day.temp.night)}°</span>
                  </span>
                </div>
              ))}
            </section>*/}

            {/*Grid section*
            <section className="current-day">
              <span className="current-day-title">Today's Highlights</span>
              <div className="current-day-grid">
                <div className="day-info-box">
                  <span className="day-box-title">UV Index</span>
                  <div className="uvi-box">
                    <img src={handleUVIIcon(UVIndex)} alt="windsock" className="uvi-icon" />
                  </div>
                </div>
                {/* *
                <div className="day-info-box">
                  <span className="day-box-title">Wind Status</span>
                  <div className="wind-box">
                    <div className="wind-details">
                      <div className="wind-details-wind">
                        <span className="wind-speed">{windSpeed}</span>
                        <div className="wind-speed-text">
                          <span>KM/H</span>
                          <span>Wind</span>
                        </div>
                      </div>
                      <div className="wind-details-gust">
                        <span className="wind-speed">{windGust}</span>
                        <div className="wind-speed-text">
                          <span>KM/H</span>
                          <span>Gust</span>
                        </div>
                      </div>
                    </div>
                    <div className="wind-direction">
                      <img src="../public/icons/compass.svg" alt="windsock" className="compass-icon" />
                      <span className="wind-d-text">{windDirection}</span>
                    </div>
                  </div>
                </div>

                {/* *
                <div className="day-info-box">
                  <span className="day-box-title">Sunrise & Sunset</span>
                  <div className="sunrise">
                    <img src="/icons/sunrise.svg" alt="windsock" className="daily-weather-icon" />
                    <span>{new Date(sunrise * 1000).toLocaleTimeString({ timezone: "Africa/Johannesburg" })}</span>
                  </div>
                  <div className="sunrise">
                    <img src="/icons/sunset.svg" alt="windsock" className="daily-weather-icon" />
                    <span>{new Date(sunset * 1000).toLocaleTimeString({ timezone: "Africa/Johannesburg" })}</span>
                  </div>
                </div>
                {/* *
                <div className="day-info-box">
                  <span className="day-box-title">Humidity</span>
                  <div className="humidity-details">
                    <span className="humidity-total">{humidity}</span>
                    <span>%</span>
                  </div>
                  <div className="humidity-description">
                    <img src="/icons/raindrop.svg" alt="windsock" className="daily-weather-icon" />
                  </div>
                </div>
                {/* *
                <div className="day-info-box">
                  <span className="day-box-title">Visibility</span>
                  <div className="visibility-details">
                    <span className="visibility-distance">{handleVisibility(visibility)}</span>
                    <span>km</span>
                  </div>

                  <span className="">Average 😉</span>
                </div>
                {/* *
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
            </section>*/}
          </div>
        </section>
      </div>
    </body>
  );
}
