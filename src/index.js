const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

// fetch data
exports.fetchData = async (location, year) => {
	const baseURL = `https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/`;
	try {
		if (year) {
			const weatherData = await axios.get(`${baseURL}${location}/year/${year}`, { headers: {'x-api-key': process.env.API_KEY}})
				.then(response => response.data.result);
			return weatherData;
		} else {
			const yearsData = await axios.get(`${baseURL}${location}/years`, { headers: {'x-api-key': process.env.API_KEY}})
				.then(response => response.data.result);
			return yearsData;
		}
	} catch (error) {
		return 'error';
	}
}

// Get maximum Temperature for a year - Must return a number
exports.getMaxTemperature = async ({location, year}) => {
	const weatherData = await exports.fetchData(location, year);
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
	const weatherData = await exports.fetchData(location, year);
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
	const yearsData = await exports.fetchData(location, 0);
	let startYear = yearsData.startYear;
	let endYear = yearsData.endYear;
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
	const yearsData = await exports.fetchData(location, 0);
	let startYear = yearsData.startYear;
	let endYear = yearsData.endYear;
	let minTempForAllYears = 100 ;
	// find min temp for each year
	for (let year = startYear; year <= endYear; year++) {
		let minTemp = await exports.getMinTemperature({location:location, year:year});
		//console.log(minTemp)
		if (minTemp < minTempForAllYears) {
			minTempForAllYears = minTemp;
		}
	}
	return minTempForAllYears;
}

// Get average sun hours for a year - Must return a number
exports.getAverageSunHours = async ({location, year}) => {
	const weatherData = await exports.fetchData(location, year);
	//console.log(weatherData);
	if (weatherData !== 'error') {
		// counter
		let totalSunHours = 0;
		let monthsNumber = 0
		// Iterate over each month of the year and add the sun value to the sunHours counter
		for (let i = 0; i < weatherData.length; i++) {
			if ( weatherData[i].sun !== 'null') {
				let sunHours = weatherData[i].sun;
				totalSunHours += sunHours;
				monthsNumber += 1;
			} else {
				null
			}
		}
		// calculate average sun hours and convert string result to number
		const averageSunHours = Number((totalSunHours / monthsNumber).toFixed(1));
		return averageSunHours ? averageSunHours : 0;
	} else {
		return 0
	}
}

// Get average sun hours for all years - Must return a number
exports.getAverageSunHoursForLocation = async ({location}) => {
	const yearsData = await exports.fetchData(location, 0);
	let startYear = yearsData.startYear;
	let endYear = yearsData.endYear;
	let totalSunHoursAverages = 0;
	let numOfYears = 0;
	// find average sun hours for each year
	for (let year = startYear; year <= endYear; year++) {
		let averageSunHoursForYear = await exports.getAverageSunHours({location:location, year:year});
		if (averageSunHoursForYear !== 0) {
			totalSunHoursAverages += averageSunHoursForYear;
			numOfYears += 1;
		}
	}
	const averageSunHoursForLocation = totalSunHoursAverages === 0 ? 0 : Number((totalSunHoursAverages / numOfYears).toFixed(1));
	return averageSunHoursForLocation;
}
