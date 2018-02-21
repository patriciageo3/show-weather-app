

let tempTransf = temp => {
        return Math.round(temp);
    };

let stringTransf = string => string.charAt(0).toLowerCase() + string.slice(1); //make the first letter lowerCase :)

function summary(response) {
    return new Promise((resolve, reject) => {
        let summary = stringTransf(response.data.currently.summary);
        let temp = tempTransf(response.data.currently.temperature);
        let actualTemp = tempTransf(response.data.currently.apparentTemperature);
        let precipProbability = response.data.currently.precipProbability;
        let precipType = response.data.currently.precipType;

        let nextDaysSummary = stringTransf(response.data.daily.summary);

        let tomorrow = response.data.daily.data[0];
        let tomorrowSummary = stringTransf(tomorrow.summary);
        let tomorrowHighTemp = tempTransf(tomorrow.temperatureHigh);
        let tomorrowLowTemp = tempTransf(tomorrow.temperatureLow);
        let tomorrowActualHighTemp = tempTransf(tomorrow.apparentTemperatureHigh);
        let tomorrowActualLowTemp = tempTransf(tomorrow.apparentTemperatureLow);
        let tomorrowPrecipProbability = tomorrow.precipProbability;
        let tomorrowPrecipType = tomorrow.precipType;

        resolve({
            summary() {
                console.log(`Weather TODAY: \n * The weather is: ${summary}. \n * Current temperature: ${temp}\xB0C, feeling like: ${actualTemp}\xB0C.`);
                (precipProbability !== 0) ? console.log(` * There is a probability of precipitation (${precipType}) of: ${precipProbability}.`) : console.log(" * There is no probability of precipitation.");
                console.log(`Weather TOMORROW: \n * The weather will be: ${tomorrowSummary} \n * Temperature interval: ${tomorrowLowTemp}\xB0C (min) and ${tomorrowHighTemp}\xB0C (max) - real feel: ${tomorrowActualLowTemp}\xB0C (min) and ${tomorrowActualHighTemp}\xB0C (max).  `);
                (tomorrowPrecipProbability !== 0) ? console.log(` * There is a probability of precipitation (${tomorrowPrecipType}) of: ${tomorrowPrecipProbability}.`) : console.log(" * There is no probability of precipitation tomorrow.");
                console.log(`Weather in the next 7 days: \n * The weather will be: ${nextDaysSummary}`);
                console.log("~~~ End of request ~~~         "); 
            }
        });   
    });
}

module.exports.summary = summary;