// ISS |
// const fetchMyIP  = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
// ISS ||
// const fetchCoordsByIP  = require('./iss');

// fetchCoordsByIP('207.228.85.169',(error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , data);
// });
// ISS |||
// const fetchISSFlyOverTimes  = require('./iss');

// fetchISSFlyOverTimes({ latitude: '43.63190', longitude: '-79.37160' },(error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , data);
// });
// ISS |V
const {nextISSTimesForMyLocation} = require('./iss');
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  printPassTimes(passTimes);
});

