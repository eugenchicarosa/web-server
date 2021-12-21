const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Andrew Mead" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Andrew Mead" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "What can we help you with?",
    name: "Andrew Mead",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide an address" });
  }

  geocode(req.query.address, (error, { lat, long, place_name } = {}) => {
    if (error) return res.send({ error });

    forecast(lat, long, (error, forecastData) => {
      if (error) return res.send({ error });
      res.send({
        description: forecastData.description,
        temperature: forecastData.temperature,
        precipitation: forecastData.precipitation,
        wind_speed: forecastData.wind_speed,
        address: req.query.address,
        location: place_name,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "you must provide a search term" });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help page not found",
    name: "Andrew mead",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Andrew mead",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000.");
});
