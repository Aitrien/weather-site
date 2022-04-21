const tempDisplay = document.getElementById('real-temp');
const tempKelvin = tempDisplay.textContent.split("°")[0];
let tempFactor = 1;
let tempOffset = 273.15;
let degreeSymbol = "C"

function updateTemp() {
	tempDisplay.textContent = `${ Math.round(tempKelvin * tempFactor - tempOffset) }°${ degreeSymbol }`;
}

updateTemp();

function swapCelsius() {
	tempFactor = 1;
	tempOffset = 273.15;
	degreeSymbol = "C";
	updateTemp();
}

function swapFahrenheit() {
	tempFactor = 1.8;
	tempOffset = 459.67;
	degreeSymbol = "F";
	updateTemp();
}

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