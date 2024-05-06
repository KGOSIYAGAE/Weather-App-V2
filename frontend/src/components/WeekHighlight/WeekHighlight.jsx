import React from "react";
import "./WeekHighlight.css";

export default function WeekHighlight({ dailyWeather, timeZone }) {
  const dayOptions = {
    weekday: "long",
  };

  const timeOptions = {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };

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

  return (
    <div className="week-container">
      <span className="current-day-title">This Week's Highlights</span>
      <section className="days-grid">
        {dailyWeather.slice(1).map((day) => (
          <div key={day.dt} className="box">
            <span className="box-title">{new Date(day.dt * 1000).toLocaleDateString({ timeZone }, dayOptions)}</span>
            <div className="box-icon-container">
              {/*<WeatherSvg state={} width={60} height={60} />*/}
              <img className="daily-weather-icon" src={hadnleDayIcon(day.weather[0].icon)}></img>
            </div>
            <span className="box-temp-txt">
              {Math.floor(day.temp.day)}°<span className="box-temp-txt2">{Math.floor(day.temp.night)}°</span>
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

/*
 <section className="days-grid">
      {dailyWeather.slice(1).map((day) => (
        <div key={day.dt} className="box">
          <span className="box-title">{new Date(day.dt * 1000).toLocaleDateString({ timeZone }, dayOptions)}</span>
          <div className="box-icon-container">
            {/*<WeatherSvg state={} width={60} height={60} />*
            <img className="daily-weather-icon" src={hadnleDayIcon(day.weather[0].icon)}></img>
          </div>
          <span className="box-temp-txt">
            {Math.floor(day.temp.day)}°<span className="box-temp-txt2">{Math.floor(day.temp.night)}°</span>
          </span>
        </div>
      ))}
    </section>
*/
