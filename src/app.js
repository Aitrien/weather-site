// config file
let config;
loadConfig();

// fetches API keys from config.json file
async function loadConfig() {
    const response = await fetch("../config.json", {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const configData = await response.json();
    config = configData;
}

// makes an API call to the OpenWeather API for a given location
async function getWeather(location) {
    const fetchString = "http://api.openweathermap.org/data/2.5/weather?q=" + 
                        location + "&appid=" + config.weatherKey;
    const response = await fetch(fetchString, {
        mode: 'cors'
    });
    const weatherData = await response.json();
    console.log(weatherData);
}