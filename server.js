const express = require('express');
const request = require('request');
const dotenv = require('dotenv');


const app = express();
dotenv.config()
const API_key = process.env.API_KEY;
const port = process.env.PORT;

app.get("/", (req,res) => {
    var lat = req.query.lat;
    var lon = req.query.lon;

    request(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=imperial`, function(error, response, body) {
    var request = require('request');
    let data = JSON.parse(body);

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude coordinates are required' });
      }

    lat = lat.replace(/[^0-9.]/g, '');
    lon = lon.replace(/[^0-9.]/g, '');
    
    
    

    if(response.statusCode === 200) {
        var temp = data.main.temp;
        if (temp > 90) {
            temp = 'hot';
        }  else if (temp < 90 && temp > 65) {
            temp = 'medium';
        } else {
            temp = 'cool'
        }
        
        res.send(`The weather in the location ${data.name}, ${data.sys.country} at "${lat} lattitude, ${lon} longitude" is ${data.weather[0].description}, and the temperature is ${temp}.`);
    }
    else {
        res.send(`Poorly formatted request. Lattitude and longitude must be sent as strictly numerical values in the format "xxx.xxx" . 
        \n Error: ${data.message}`)
        
    }
        console.log('statusCode', response && response.statusCode);
        console.log('body', data);
    });
});

app.listen(port, () => console.log(`server started on port ${port}`));