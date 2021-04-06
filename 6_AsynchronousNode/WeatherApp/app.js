const request =  require('request');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const url = 'http://api.weatherstack.com/current?access_key=093a8220b5c1fcfee502b619d2eb9f5f&query=37.8267,-122.4233&units=m';


//todo Note the JSON parsing is specified in options
// else we will have to do JSON.parse(response.body)


console.log(process.argv);


const location = process.argv.slice(2);
if(!location)
    console.log('Please provide a location');

else {

    geoCode(location, (error, geoData) => {
        if (error) {
            return console.log(error);
        }


        console.log('geoData ' + JSON.stringify(geoData));
        //todo Note the renaming of ForecastData and geoData just to avoid
        // the conflict between the variable name

        forecast( geoData.longitude,geoData.latitude, (error, foreCastData) => {
            if (error) {
                return console.log(error);
            }

            console.log(geoData.location);
            console.log('Data ', foreCastData);
        })
    })
}

