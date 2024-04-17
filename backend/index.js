import express from "express";
import { PORT } from "./config/config.js";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const GEO_URL = "http://api.openweathermap.org/";
const location = "London";
const APIKey = "69b03d0815bd8cf2798a9a453358a2b6";
const limit = 1;

const WEATHER_URL = "https://api.openweathermap.org/data/3.0/onecall?";
//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware to set the CORS Policy
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

//Method Get coordinates of location
const getCoordinates = async (cityName) => {
  try {
    const response = await axios.get(GEO_URL + `geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIKey}`);
    const results = response.data[0];
    return results;
  } catch (error) {
    console.log(error);
  }
};

//Get coordinates of location
app.post("/weather", async (req, res) => {
  const { cityName } = req.body;
  const { lat, lon } = await getCoordinates(cityName || "Kimberley");
  //&exclude=minutely,hourly,alert&appid=${APIKey}`
  try {
    const response = await axios.get(WEATHER_URL + `lat=${lat}&lon=${lon}units=metric&appid=${APIKey}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(501).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
