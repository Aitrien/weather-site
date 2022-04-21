// config file
const config = require('../config.json');
// node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express');
const router = express.Router();

router.use(express.static('public'));

// As weather is currently the only option, redirect to home page
router.get('/', (req, res, next) => {
	//res.send("default weather page");
	res.redirect('/');
	next();
});

router.get('/:location', (req, res) => {
	getWeather(req.params.location)
	.then(response => {
		if (response.cod === 200) {
			// Location searched exists, render forecast html
			res.render('forecast', response);
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
