/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');


const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  // call back takes two parameters
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error,null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      const IP = data["ip"];
      // console.log(IP);
      callback(null,IP);
    }
  });
};



const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/invalidiphere${ip}`, (error, response, body) => {
    if (error) {
      return callback(error,null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const IPObject = JSON.parse(body);
      const latitude = IPObject["data"]["latitude"];
      const longitude = IPObject["data"]["longitude"];
      const geoObject = {};
      geoObject["latitude"] = latitude;
      geoObject["longitude"] = longitude;
      // console.log(IP);
      callback(null,geoObject);
    }
  });
};
module.exports = fetchMyIP;
module.exports = fetchCoordsByIP;