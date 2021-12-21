const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZXVnZW5jaGljYXJvc2EiLCJhIjoiY2t4YWNpbjQ1MHlqODJycWMyZ2dheHlhNCJ9.UWUke_BhoAj7D-jPUM7J7A&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geolocation service", undefined);
    } else if (!body.features.length) {
      callback("Unable to find geolocation results", undefined);
    } else {
      const long = body.features[0].center[0];
      const lat = body.features[0].center[1];
      const placeName = body.features[0].place_name;
      callback(undefined, { lat, long, place_name: placeName });
    }
  });
};

module.exports = geocode;
