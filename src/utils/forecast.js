const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6dda9ec1253c43c15fa633a4973ff48c&query=${lat},${long}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      console.log(body.current);
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        precipitation: body.current.precip,
        wind_speed: body.current.wind_speed,
      });
    }
  });
};

module.exports = forecast;
