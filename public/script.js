// main temperature display
const tempDisplay = document.getElementById('real-temp');
// table elements
const feelsDisplay = document.getElementById('display-feels');
const highLowDisplay = document.getElementById('display-highlow');
const windDisplay = document.getElementById('display-wind');
const visibDisplay = document.getElementById('display-visibility');

const rawData = {
	"rawTemp" : tempDisplay.textContent,
	"rawFeels" : feelsDisplay.textContent,
	"rawHighLow" : highLowDisplay.textContent.split("/"),
	"rawWind" : windDisplay.textContent,
	"rawVisib" : visibDisplay.textContent
}

const fahrenheitBtn = document.getElementById('fahrenheit-btn');
const celsiusBtn = document.getElementById('celsius-btn');
let tempFactor = 1;
let tempOffset = 273.15;
let degreeSymbol = "C"

loadPreference();

function updateTemp() {
	tempDisplay.textContent = `${ Math.round(rawData["rawTemp"] * tempFactor - tempOffset) }°${ degreeSymbol }`;
}
updateTemp();

function swapCelsius() {
	tempFactor = 1;
	tempOffset = 273.15;
	degreeSymbol = "C";
	feelsDisplay.textContent = `${ Math.round(rawData["rawFeels"] * tempFactor - tempOffset) }°${ degreeSymbol }`;
	highLowDisplay.textContent = `${ Math.round(rawData["rawHighLow"][0] * tempFactor - tempOffset) }°/${ Math.round(rawData["rawHighLow"][1] * tempFactor - tempOffset) }°${ degreeSymbol }`;
	windDisplay.textContent = `${ rawData["rawWind"] } km/h`;
	visibDisplay.textContent = `${ (rawData["rawVisib"] / 1000).toPrecision(3) } km`;
	localStorage.setItem("tempPref", "celsius");
	updateTemp();
}

function swapFahrenheit() {
	tempFactor = 1.8;
	tempOffset = 459.67;
	degreeSymbol = "F";
	feelsDisplay.textContent = `${ Math.round(rawData["rawFeels"] * tempFactor - tempOffset) }°${ degreeSymbol }`;
	highLowDisplay.textContent = `${ Math.round(rawData["rawHighLow"][0] * tempFactor - tempOffset) }°/${ Math.round(rawData["rawHighLow"][1] * tempFactor - tempOffset) }°${ degreeSymbol }`;
	windDisplay.textContent = `${ (rawData["rawWind"] * 0.6213712).toPrecision(3) } mph`;
	visibDisplay.textContent = `${ (rawData["rawVisib"] * 0.6213712 / 1000).toPrecision(3) } miles`;
	localStorage.setItem("tempPref", "fahrenheit");
	updateTemp();
}

// Load the user's preferred measurements
function loadPreference() {
	userPreference = localStorage.getItem("tempPref");
	switch(userPreference) {
		case "celsius":
			celsiusBtn.checked = true;
			swapCelsius();
			break;
		case "fahrenheit":
			fahrenheitBtn.checked = true;
			swapFahrenheit();
			break;
		case null:
			celsiusBtn.checked = true;
			localStorage.setItem("tempPref", "celsius");
			swapCelsius();
	}
}

// Handles the search bar functionality and submits valid inputs
function handleForm(e) {
	const form = document.getElementById('search');
	const searchBar = document.getElementById('location');
	const location = searchBar.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");

	if (location == "") {
		e.preventDefault();
		const searchContents = document.getElementById('search-contents');
		if (searchContents.childElementCount < 3) {
			const feedback = document.createElement('div');
			feedback.classList.add('invalid-feedback');
			feedback.textContent = 'Try inputting a location first';
			searchContents.appendChild(feedback);
		}
		return;
	}

	form.action = location;
	form.submit();
}