const http = require('http');
const url = `http://api.weatherstack.com/current?access_key=093a8220b5c1fcfee502b619d2eb9f5f&query=18.9666,72.8333&units=m`;

const request = http.request(url,response=>{

    //todo here we dont have access to entire response body
    // but only a few chunks of it

    //todo Note response.on function registers a handler
    // which can be used for multiple chunks

    let data = '';
    response.on('data',(chunk)=>{
        data = data+chunk.toString();
    })

    response.on('end',(chunk)=>{
        const body = JSON.parse(data);
        console.log(body);
    })

})

request.on('error',(error)=>{
    console.log(`An error ${error}`)
})

request.end();