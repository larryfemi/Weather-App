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
// app.use(bodyParser.json());

weatherData();

app.get("/", async (req, res) => {
	res.render("index");
});

app.post("/", (req, res) => {
	res.redirect("/");
});

const listening = () => console.log(`Server started at port ${port}`);

app.listen(port, listening());
