const express = require("express");
const router = express.Router();
const { weatherData, processWeatherData } = require("../controllers/weather");

router.get("/", async (req, res) => {
	const newWeatherData = await weatherData();
	const getWeatherData = processWeatherData(newWeatherData);
	const showWeather = { weather: getWeatherData };
	res.render("index", showWeather);
});

router.post("/", async (req, res) => {
	const { city } = req.body;
	const newWeatherData = await weatherData(city);
	let showWeather = { weather: null };
	if (newWeatherData) {
		const getWeatherData = processWeatherData(newWeatherData);
		showWeather = { weather: getWeatherData };
	}
	res.render("index", showWeather);
	// res.redirect("/");
});

module.exports = router;
