# Weather Site

## Overview

This is a simple weather forecast website that allows users to search for and view the weather/5-day forecast in various locations. This project utilizes the [OpenWeather API](https://openweathermap.org/) for real-time weather data and is built using Express.js.

A live example can be found at [https://weather-lime.onrender.com](https://weather-lime.onrender.com)

## Features

- **Search Functionality**: Users can search for weather by city, town, or specific location.
- **Real-time Weather Data**: Displays current weather, temperature, humidity, wind speed, visibility, and more.
- **5-Day Forecast**: Shows a 5-day weather forecast with conditions and temperature range.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **API**: OpenWeather API

## Installation

To set up the project locally, follow these steps:

```bash
git clone https://github.com/Aitrien/weather-site.git
cd weather-site
npm install
```
Note: An OpenWeather API key is required, create a `.env` file in the main directory and add the key `WEATHER_KEY = yourkeygoeshere`. After that you can run the app using:
```bash
npm start
```
Navigate to `http://localhost:3000` to view the project in your browser.

## Usage

Enter a location into the search bar on the homepage to retrieve and display the current weather data and the upcoming 5-day weather forecast. When there are more than one city with the same name, the city name followed by the country or state code will navigate to the desired location - For example `London, CA` will show the weather data for London, Canada.

## Screenshots 

![Alt text for screenshot](/images/home-page.png)
*A look at the landing page for this website.*

![Alt text for screenshot](/images/full-weather-page.png)
*Typical view of the displayed weather data, along with a weather warning.*

![Alt text for screenshot](/images/rainy-page.png)
*Background changed for different weather results.*
