const axios = require('axios');

// fetch data
fetchData = async (location, year) => {
	try {
		if (year) {
			const locationYearDataArray = await axios.get(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/year/${year}`, { headers: {'x-api-key': 'mcDLmlxrtw7ZHC70gD8FL4rtrXSPsUEB4iSp4lg3'}})
				.then(response => response.data.result);
			return locationYearDataArray;
		} else {
			const locationData = await axios.get(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/years`, { headers: {'x-api-key': 'mcDLmlxrtw7ZHC70gD8FL4rtrXSPsUEB4iSp4lg3'}})
				.then(response => response.data.result);
			return locationData;
		}
	} catch (error) {
		return 'error';
	}
}

// Get maximum Temperature for a year - Must return a number
exports.getMaxTemperature = async ({location, year}) => {
	const weatherData = await fetchData(location, year);
	if (weatherData !== 'error') {
		let maxTemp = weatherData[0].temperature_max;
		for (let i = 0; i < weatherData.length; i++) {
			if (weatherData[i].temperature_max > maxTemp) {
				maxTemp = weatherData[i].temperature_max;
			}
		}
		return typeof(maxTemp) === 'number' ? maxTemp : 0;
	} else {
		return 0;
	}
}

// Get minimum temperature for a year - Must return a number
exports.getMinTemperature = async ({location, year}) => {
	const weatherData = await fetchData(location, year);
	//console.log(weatherData)
	if (weatherData !== 'error') {
		let minTemp = weatherData[0].temperature_min;
		for (let i = 0; i < weatherData.length; i++) {
			if (weatherData[i].temperature_min < minTemp) {
				minTemp = weatherData[i].temperature_min;
			}
		}
		return typeof(minTemp) === 'number' ? minTemp : 0;
	} else {
		return 0;
	}
}

// Get maximum Temperature for all years - Must return a number
exports.getMaxTemperatureForLocation = async ({location}) => {
	const locationData = await fetchData(location, 0);
	let startYear = locationData.startYear;
	let endYear = locationData.endYear;
	let maxTempForAllYears = 0 ;
	// find max temp for each year
	for (let year = startYear; year <= endYear; year++) {
		let maxTemp = await exports.getMaxTemperature({location:location, year:year});
		//console.log(maxTemp)
		if (maxTemp > maxTempForAllYears) {
			maxTempForAllYears = maxTemp;
		}
	}
	return maxTempForAllYears;

}

// Get minimum temperature for all years - Must return a number
exports.getMinTemperatureForLocation = async ({location}) => {
	return 0;
}

// Get average sun hours for a year - Must return a number
exports.getAverageSunHours = async ({location, year}) => {
	return 0;
}

// Get average sun hours for all years - Must return a number
exports.getAverageSunHoursForLocation = async ({location}) => {
	return 0;
}
