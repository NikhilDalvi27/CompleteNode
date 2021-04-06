const request = require('request');

const geoCode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZHJlYW1lcjAwNyIsImEiOiJja24xc21wMGwwZWNyMnVvdWQ4a3c3NHN3In0.ruDzLAdTuk7k_Dkwf1p0FA&limit=1`;

    request({url:url, json:true },(error,response)=>{
        if(error){
            callback(`Unable to connect to Location Services!`,undefined);
        }
        else if(response.body.features.length===0){
            callback(`Unable to find Location, Try another Search`,undefined);
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })
}

module.exports = geoCode;