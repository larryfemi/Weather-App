const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const weatherRoute = require("./routes/weather");
require("dotenv").config();

const port = process.env.PORT || 5050;

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", weatherRoute);

const listening = () => console.log(`Server started at port ${port}`);

app.listen(port, listening());
