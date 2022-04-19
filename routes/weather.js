// config file
const config = require('../config.json');
// node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	//res.render('index');
	res.send("default weather page");
});

router.get('/:location', (req, res) => {
	getWeather(req.params.location)
	.then(response => {
		if (response.cod === 200) {
			res.json(response);

		}	else {
			res.send("unknown location")
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
