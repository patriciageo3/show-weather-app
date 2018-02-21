const axios = require('axios');
const output = require('./output.js');

function fetchCoordinatesAndWeather(address) {   
    let urlPart1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    let secretKey = "AIzaSyBq7P6cKe9ugQ9mkEdxcUjIagoAgJheqMw";
    let encodedAddress = encodeURIComponent(address); 
        
    let geocodeURL = `${urlPart1}${encodedAddress}&key=${secretKey}`; 

    let fullAddress;

    axios.get(geocodeURL).then(response => {
        if (response.data.status !== "OK") {
            throw new Error("Error: Something went wrong, try again!");
        }
        
        fullAddress = response.data.results[0].formatted_address;
        
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let weatherURL = `https://api.darksky.net/forecast/6b54f63c42e5efb712b0ceec71ab0e72/${lat},${lng}?units=si`;
        return axios.get(weatherURL);
    }).then( (response) => {
        output.summary(response).then(data => {
                console.log(`~~~ Beginning of request ~~~         `);
                console.log(`Address provided: ${fullAddress}`);
                data.summary();
            }).catch(e => console.log(e));
    }).catch(e => {
        if (e.code === "ENOTFOUND" || e.code === "ECONNREFUSED" || e.code === "ETIMEMOUT" ) {
            console.log("Unable to connect to the server!");        
        } else {
            console.log(e.message);
        }
    });
}

module.exports.fetchCoordinatesAndWeather = fetchCoordinatesAndWeather;