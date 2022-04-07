const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const port = 5050;
const AppKey = process.env.API_KEY;

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const appData = {
	appkey: AppKey,
};

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/weather", (req, res) => {
	console.log(req.body);
});

const listening = () => console.log(`Server started at port ${port}`);

app.listen(port, listening());
