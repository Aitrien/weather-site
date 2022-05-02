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
			// Location searched exists, render forecast html
			//res.render('forecast', response);
			res.render('forecast', 
				{	
					location : response.name,
					country : response.sys.country,
					time : new Date(response.dt * 1000).toLocaleString(),
					temp : response.main.temp,
					weather : response.weather[0].main,
					description : response.weather[0].description,
					temp_feels : response.main.feels_like,
					temp_high : response.main.temp_max,
					temp_low : response.main.temp_min,
					pressure : response.main.pressure,
					humidity : response.main.humidity,
					wind_speed : response.wind.speed,
					wind_dir : response.wind.deg,
					visibility : response.visibility,
					time_sunrise : new Date(response.sys.sunrise * 1000).toLocaleTimeString(),
					time_sunset : new Date(response.sys.sunset * 1000).toLocaleTimeString()
				});
		}	else {
			// Location searched does not exist, render unknown html (to be implemented)
			res.send(`Unknown location: ${ req.params.location }`);
		}
	});
});

// makes an API call to the OpenWeather API for a given location
async function getWeather(location) {
	const fetchString = "http://api.openweathermap.org/data/2.5/weather?q=" + 
											location + "&appid=" + config['weatherKey'];
	const response = await fetch(fetchString, {
		mode: 'cors'
	});
	const weatherData = await response.json();
	return weatherData;
}


module.exports = router;
