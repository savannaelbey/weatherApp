const axios = require('axios');

// fetch data
// fetchLocationYearData = async(location, year) => {
// 	const response = await axios.get(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/year/${year}`, { headers: {'x-api-key': 'mcDLmlxrtw7ZHC70gD8FL4rtrXSPsUEB4iSp4lg3'}
// 	});
// 	console.log(response)
// 	return response.data.result;
// }

// Get maximum Temperature for a year - Must return a number
exports.getMaxTemperature = async ({location, year}) => {
	const dataArray = await axios.get(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/year/${year}`, { headers: {'x-api-key': 'mcDLmlxrtw7ZHC70gD8FL4rtrXSPsUEB4iSp4lg3'}})
		.then(response => response.data.result);
	//console.log(dataArray);
	let maxTemp = 0;
	for (let i = 0; i < dataArray.length; i++) {
		if (dataArray[i].temperature_max > maxTemp) {
			maxTemp = dataArray[i].temperature_max;
		}
	}
	return maxTemp;
}

// Get minimum temperature for a year - Must return a number
exports.getMinTemperature = async ({location, year}) => {
	return 0;
}

// Get maximum Temperature for all years - Must return a number
exports.getMaxTemperatureForLocation = async ({location}) => {
	return 0;
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
