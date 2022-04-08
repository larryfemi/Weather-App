const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { response } = require("express");
const { weatherData } = require("./controllers/weather");
const e = require("express");
require("dotenv").config();

const port = 5050;
const appKey = process.env.API_KEY;

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	const newWeatherData = await weatherData();
	const getTemp = Math.floor(newWeatherData.main.temp - 273.15);
	const getFeelsLike = Math.floor(newWeatherData.main.feels_like - 273.15);
	const weatherDetails = {
		icon: newWeatherData.weather[0].icon,
		humidity: newWeatherData.main.humidity,
		description: newWeatherData.weather[0].description,
		temperature: getTemp,
		feelsLike: getFeelsLike,
		cloudType: newWeatherData.weather[0].main,
		cityName: newWeatherData.name,
		countryCode: newWeatherData.sys.country,
	};
	// console.log(weatherDetails);
	const showWeather = { weather: weatherDetails };
	res.render("index", showWeather);
});

app.post("/", (req, res) => {
	res.redirect("/");
});

const listening = () => console.log(`Server started at port ${port}`);

app.listen(port, listening());
