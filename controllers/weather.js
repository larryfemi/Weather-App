const fetch = require("node-fetch");
const { response } = require("express");
require("dotenv").config();

const appKey = process.env.API_KEY;

const weatherData = async (city) => {
	const _city = city ?? "london";
	const url = `http://api.openweathermap.org/geo/1.0/direct?q=${_city}&appid=${appKey}`;
	const getData = await fetch(url);
	const response = await getData.json();
	try {
		if (response.length >= 1) {
			const lat = response[0].lat;
			const lon = response[0].lon;
			const newUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appKey}`;
			const newData = await fetch(newUrl);
			const data = await newData.json();
			return data;
		}
		return;
		// console.log(data);
	} catch (error) {
		console.log(error);
		return;
	}
};

const processWeatherData = (newWeatherData) => {
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
	return weatherDetails;
};

module.exports = { weatherData, processWeatherData };
