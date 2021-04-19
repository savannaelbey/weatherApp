const readline = require("readline");
const { 
	getMaxTemperature, 
	getMinTemperature, 
	getMaxTemperatureForLocation, 
	getMinTemperatureForLocation,
	getAverageSunHours,
	getAverageSunHoursForLocation } = require('./src/index')


const printOutWeather = async ({location, year}) => {
	const MaxTemperature = await getMaxTemperature({location: location, year: year})
	const MinTemperature = await getMinTemperature({location: location, year: year})
	const MaxTemperatureForLocation = await getMaxTemperatureForLocation({location: location})
	const MinTemperatureForLocation = await getMinTemperatureForLocation({location: location})
	const AverageSunHours = await getAverageSunHours({location: location, year: year})
	const AverageSunHoursForLocation = await getAverageSunHoursForLocation({location: location})

	console.log(`The max temperature for ${location} in ${year} is: ${MaxTemperature}`)

	console.log(`The min Temperature for ${location} in ${year} is: ${MinTemperature}`)

	console.log(`The max temperature for ${location} is: ${MaxTemperatureForLocation}`)

	console.log(`The min Temperature for ${location} is: ${MinTemperatureForLocation}`)

	console.log(`The average sun hours for ${location} in ${year} is: ${AverageSunHours} `)

	console.log(`The average sun hours for ${location} is: ${AverageSunHoursForLocation}`)
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Location?\noxford or heathrow ? ", (location) => {
    rl.question("Year? ", (year) => {
       	printOutWeather({location: location, year: year})
        rl.close();
    });
});