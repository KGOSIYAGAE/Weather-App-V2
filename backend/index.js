import express from "express";
import { PORT } from "./config/config.js";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const GEO_URL = "http://api.openweathermap.org/";
const location = "London";
const APIKey = "69b03d0815bd8cf2798a9a453358a2b6";
const limit = 1;

const WEATHER_URL = "https://api.openweathermap.org/data/3.0/onecall?";
//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Method Get coordinates of location
const getCoordinates = async () => {
  try {
    const response = await axios.get(GEO_URL + `geo/1.0/direct?q=${location}&limit=${limit}&appid=${APIKey}`);
    const results = { data: response.data[0] };
    return results.data;
  } catch (error) {
    console.log(error);
  }
};

//Get coordinates of location
app.get("/weather", async (req, res) => {
  const { lat, lon } = await getCoordinates();
  //&exclude=minutely,hourly,alert&appid=${APIKey}`
  try {
    const response = await axios.get(WEATHER_URL + `lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${APIKey}`);
    res.status(200).json({ data: response.data });
  } catch (error) {
    console.log(error.message);
    res.status(501).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
