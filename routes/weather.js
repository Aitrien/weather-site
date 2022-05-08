// config file
const config = require('../config.json');
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
		if (response.cod === 200) {
			// res.json(response);
			// Location searched exists, render forecast html
			//res.render('forecast', response);
			res.render('forecast', 
				{	
					location : response.name,
					country : response.sys.country,
					time : new Date((response.dt) * 1000).toLocaleString(),
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
					windSpeed : response.wind.speed,
					windDir : response.wind.deg,
					visibility : response.visibility,
					timeSunrise : new Date(response.sys.sunrise * 1000).toLocaleTimeString(),
					timeSunset : new Date(response.sys.sunset * 1000).toLocaleTimeString(),
				});
		}	else {
			// Location searched does not exist, render unknown html (to be implemented)
			res.send(`Unknown location: ${ req.params.location }, CODE: ${ response.cod }`);
		}
	});
});

// Makes an API call to the OpenWeather API for a given location
async function getWeather(location) {
	const fetchString = `http://api.openweathermap.org/data/2.5/weather?q=${ location }&appid=${ config['weatherKey'] }`;
	const response = await fetch(fetchString, {
		mode: 'cors'
	});
	const weatherData = await response.json();
	return weatherData;
}

// Returns a different rgba colour for the webpage depending on the weather type
function getBackgroundStyle(weatherType) {
	let style;

	switch(weatherType) {
		case "Clear":
			style = 'rgba(165, 165, 215, 0.8)';
			break;
		case "Clouds":
			style = 'rgba(125, 125, 125, 0.8)';
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
			style = 'rgba(185, 135, 85, 0.2)';
			break;
	}

	return style
}


module.exports = router;
