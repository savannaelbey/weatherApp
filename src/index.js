const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

// Get maximum Temperature for a year - Must return a number
exports.getMaxTemperature = async ({location, year}) => {
	const weatherData = await exports.fetchData(location, year);
	const maxTemperature = await calculateRequiredTemperature(weatherData, 'max');
	return weatherData === 'error' ? 0 : maxTemperature;
}

// Get minimum temperature for a year - Must return a number
exports.getMinTemperature = async ({location, year}) => {
	const weatherData = await exports.fetchData(location, year);
	const minTemperature = await calculateRequiredTemperature(weatherData, 'min');
	return weatherData === 'error' ? 0 : minTemperature;
}

// Get maximum Temperature for all years - Must return a number
exports.getMaxTemperatureForLocation = async ({location}) => {
	const yearsData = await exports.fetchData(location, 0);
	const maxTemperatureForLocation = await calculateRequiredTemperatureForLocation(yearsData, 'max', location, 0);
	return yearsData === 'error' ? 0 : maxTemperatureForLocation;
}

// Get minimum temperature for all years - Must return a number
exports.getMinTemperatureForLocation = async ({location}) => {
	const yearsData = await exports.fetchData(location, 0);
	const minTemperatureForLocation = await calculateRequiredTemperatureForLocation(yearsData, 'min', location, 100);
	return yearsData === 'error' ? 0 : minTemperatureForLocation;
}

// Get average sun hours for a year - Must return a number
exports.getAverageSunHours = async ({location, year}) => {
	const weatherData = await exports.fetchData(location, year);
	if (weatherData !== 'error') {
		// counter
		let totalSunHours = 0;
		let numOfMonths = 0
		// Iterate over each month of the year and add the sun value to the sunHours counter
		for (let i = 0; i < weatherData.length; i++) {
			if ( weatherData[i].sun !== 'null') {
				let sunHours = weatherData[i].sun;
				totalSunHours += sunHours;
				numOfMonths += 1;
			}
		}
		// calculate average sun hours for year and convert string result to number
		const averageSunHours = totalSunHours === 0 ? 0 : Number((totalSunHours / numOfMonths).toFixed(1));
		return averageSunHours;
	} else {
		return 0
	}
}

// Get average sun hours for all years - Must return a number
exports.getAverageSunHoursForLocation = async ({location}) => {
	const yearsData = await exports.fetchData(location, 0);
	if (yearsData !== 'error') {
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
	} else {
		return 0;
	}
}

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

// calculate min and max temperature for a year
calculateRequiredTemperature = async (weatherData, requiredTemp) => {
  if (requiredTemp === 'max') {
    let maxTemp = weatherData[0].temperature_max;
    for (let i = 0; i < weatherData.length; i++) {
      if (weatherData[i].temperature_max > maxTemp) {
        maxTemp = weatherData[i].temperature_max;
      }
    }
    return typeof(maxTemp) === 'number' ? maxTemp : 0;
  } else if (requiredTemp === 'min') {
      let minTemp = weatherData[0].temperature_min;
      for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].temperature_min < minTemp) {
          minTemp = weatherData[i].temperature_min;
        }
      }
      return typeof(minTemp) === 'number' ? minTemp : 0;
  }
}

// calculate min and max temperature for all years for a given location
calculateRequiredTemperatureForLocation = async (yearsData, requiredTemp, location, temp) => {
  let startYear = yearsData.startYear;
	let endYear = yearsData.endYear;
	let temperature = temp ;
	for (let year = startYear; year <= endYear; year++) {
    if (requiredTemp === 'min') {
      let minTempForYear = await exports.getMinTemperature({location:location, year:year});
      if (minTempForYear < temperature) {
        temperature = minTempForYear;
      }
    } else if (requiredTemp === 'max') {
      let maxTempForYear = await exports.getMaxTemperature({location:location, year:year});
	     if (maxTempForYear > temperature) {
			    temperature = maxTempForYear;
        }
      }
	  }
	return temperature;
}
