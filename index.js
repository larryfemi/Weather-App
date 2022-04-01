const express = require("express");
const app = express();
require("dotenv").config();

const port = 5050;
const AppKey = process.env.API_KEY;

app.use(express.json());
app.use(express.static("public"));

const appData = {
	appkey: AppKey,
};

const listening = () => console.log(`Server started at port ${port}`);

app.listen(port, listening());
