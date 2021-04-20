const {getMaxTemperature} = require('../src/index');

describe('getMaxTemperature', () => {
	it('Successfully gets the max Temperature for oxford 2018', async () => {
		const location = 'oxford';
		const year = 2018;
		const result = await getMaxTemperature({location:location, year:year});
		expect(result).toEqual(27.4)
	});
	it('Returns 0 if the function would error', async() => {
		// if API does not support input:
		const location = 'london';
		const year = 2018;
		const result = await getMaxTemperature({location:location, year:year});
		expect(result).toEqual(0)
	});
})
