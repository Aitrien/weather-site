// config file, replaced with ENV variable for deployment
// const config = require('../config.json');
// node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express');
const router = express.Router();

router.use(express.static('public'));

// As weather is currently the only option, redirect to home page
router.get('/', (req, res, next) => {
	res.redirect('/');
	next();
});

// When the url is a valid location (code 200), display weather page
router.get('/:location', (req, res) => {
	getWeather(req.params.location)
	.then(response => {
		//res.json(response);
		
		if (response.cod == 200) {
			// Location searched exists, render forecast page
			
			res.render('forecast', 
				{	
					location : response.name,
					country : response.sys.country,
					time : new Date((response.dt + response.timezone_offset) * 1000).toUTCString().split("GMT")[0],
					time_offset : response.timezone_offset,
					temp : response.main.temp,
					weather : response.weather[0].main,
					description : response.weather[0].description,
					backgroundColour: getBackgroundStyle(response.weather[0].main),
					weatherIcon : response.weather[0].icon,
					tempFeels : response.main.feels_like,
					tempHigh : response.main.temp_max,
					tempLow : response.main.temp_min,
					pressure : response.main.pressure,
					humidity : response.main.humidity,
					windSpeed : response.wind.speed, // FIXME: when this is zero, displays "na"
					windDir : getWindDirection(response.wind.deg),
					visibility : response.visibility,
					timeSunrise : new Date((response.sys.sunrise + response.timezone_offset) * 1000).toUTCString().split(" ")[4],
					timeSunset : new Date((response.sys.sunset + response.timezone_offset) * 1000).toUTCString().split(" ")[4],
					forecasts : response.daily,
					weatherWarnings : response.alerts
				});
		} else if (response.cod == 404) {
			// Location not in database, render 404 page
			res.render('notfound', { location: req.params.location });
		}	else {
			// Display response code and message
			res.send(`error: ${ response.cod }, ${ response.message }`);
		}
	});
});

// Make an API call to the OpenWeather API for a given location
async function getWeather(location) {
	// get current weather
	const fetchString = `https://api.openweathermap.org/data/2.5/weather?q=${ location }&appid=${ process.env.WEATHER_KEY }`;
	const currentResponse = await fetch(fetchString, {
		mode: 'cors'
	});
	const weatherData = await currentResponse.json();

	let forecastData = {};
	if (weatherData.cod == 200) {
		// get five-day forecast
		const excluded = "current,minutely,hourly";
		const forecastString = `https://api.openweathermap.org/data/2.5/onecall?lat=${ weatherData.coord.lat }&lon=${ weatherData.coord.lon }&exclude=${ excluded }&appid=${ process.env.WEATHER_KEY }`;
		const forecastResponse = await fetch(forecastString, {
			mode: 'cors'
		});
		forecastData = await forecastResponse.json();
	}
	// combine current with forecast
	const result = Object.assign({}, weatherData, forecastData);

	return result;
}

// Returns a different rgba colour for the webpage depending on the weather type
function getBackgroundStyle(weatherType) {
	let style;

	switch(weatherType) {
		case "Clear":
			style = 'rgba(165, 165, 215, 0.8)';
			break;
		case "Clouds":
			style = 'rgba(155, 155, 155, 0.8)';
			break;
		case "Rain":
			style = 'rgba(50, 105, 120, 0.8)';
			break;
		case "Drizzle":
			style = 'rgba(105, 145, 165, 0.9)';
			break;
		case "Thunderstorm":
			style = 'rgba(135, 135, 125, 0.9)';
			break;
		case "Snow":
			style = 'rgba(65, 65, 85, 0.95)';
			break;
		default:
			// Other weather eg. haze, fog, tornado, etc.
			style = 'rgba(185, 135, 115, 0.7)';
			break;
	}

	return style
}

function getWindDirection(angle) {
	const winds = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	return winds[Math.floor((angle + 45 / 2) % 360 / 45)];
}

/* Converts a country code (eg. NZ) into the unicode value of the corresponding country flag 
function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}*/


module.exports = router;
