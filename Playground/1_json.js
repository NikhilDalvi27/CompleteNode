// const fs = require('fs');
//
// const dataBuffer = fs.readFileSync('./1_json.json');
// const data = dataBuffer.toString();
// const parsedData = JSON.parse(data);
//
// console.log(parsedData.planet);



function job(state) {
    return new Promise(function(resolve, reject) {
        if (state) {
            resolve('success');
        } else {
            reject('error');
        }
    });
}

let promise = job(true);

// success
//error
//error cought

// promise
//
//     .then(function(data) {
//         console.log(data);
//
//         return job(false);
//     })
//
//     .catch(function(error) {
//         console.log(error);
//
//         return 'Error caught';
//     })
//
//     .then(function(data) {
//         console.log(data);
//
//         return job(true);
//     })
//     .catch(function(error) {
//         console.log(error);
//     });












var url = "https://ext.weatherport.co/SpartaAppServer/weatherAdapter?geo=Bronx%20County&latitude=40.83046340942383&longitude=-73.901&test=ben";
console.log(JSON.stringify(url.search));



















