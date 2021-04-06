const request = require('request');

function forecast(longitude,latitude,callback) {
    const url = `http://api.weatherstack.com/current?access_key=093a8220b5c1fcfee502b619d2eb9f5f&query=${latitude},${longitude}&units=m`;

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback(`Couldn't fetch location`);
        }
        else if(response.body.error){
            callback(`Unable to find location`)
        }
        else {
            //todo Note access everything from the body only
            callback(undefined,`${response.body.current.weather_descriptions[0]} .It's ${response.body.current.temperature} ,but feels like ${response.body.current.feelslike}`)
        }
    })
}

module.exports = forecast;