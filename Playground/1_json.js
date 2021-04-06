const fs = require('fs');

const dataBuffer = fs.readFileSync('./1_json.json');
const data = dataBuffer.toString();
const parsedData = JSON.parse(data);

console.log(parsedData.planet);