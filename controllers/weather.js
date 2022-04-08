const fetch = require("node-fetch");
const { response } = require("express");
require("dotenv").config();

const appKey = process.env.API_KEY;

const weatherData = async () => {
	const city = "london";
	const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${appKey}`;
	const getData = await fetch(url);
	const response = await getData.json();
	const lat = response[0].lat;
	const lon = response[0].lon;
	const newUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appKey}`;
	try {
		const newData = await fetch(newUrl);
		const data = await newData.json();
		return data;
		// console.log(data);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { weatherData };
