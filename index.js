const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { response } = require("express");
require("dotenv").config();

const port = 5050;
const appKey = process.env.API_KEY;

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const city = "london";
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${appKey}`;

async function newData(url) {
	const getData = await fetch(url)
		.then((res) => res.json())
		.catch((e) => console.log(e));
	const lat = getData[0].lat;
	const lon = getData[0].lon;
	const newUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appKey}`;
	try {
		const newData = await fetch(newUrl).then((res) => res.json());
		console.log(newData);
	} catch (error) {
		console.log(error);
	}
}

newData(url);

app.get("/", async (req, res) => {
	res.render("index");
});

app.post("/", (req, res) => {
	res.redirect("/");
});

const listening = () => console.log(`Server started at port ${port}`);

app.listen(port, listening());
