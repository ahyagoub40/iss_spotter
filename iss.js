/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

// ISS |
const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      error = "provided an invalid URL";
      return callback(error,null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);

    } else {
      const data = JSON.parse(body);
      const IP = data["ip"];
      // console.log(IP);
      callback(null,IP);
    }
  });
};
// ISS ||
const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      error = "provided invalid URL";
      return callback(error,null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching for coords. Response: ${body}`;
      callback(Error(msg), null);
 
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
// ISS ||
const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords["latitude"]}&lon=${coords["longitude"]}`, (error, response, body) => {
    if (error) {
      return callback(error,null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pas times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const flyOverObject = JSON.parse(body);
      const response = flyOverObject["response"];
     
      
      // console.log(IP);
      callback(null,response);
    }
  });
};
// ISS |V
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip,(error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords,(error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passTimes);
      });
    });
  });

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};