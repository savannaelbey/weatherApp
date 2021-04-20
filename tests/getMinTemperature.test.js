const {getMinTemperature} = require('../src/index')

describe('getMinTemperature', () => {
	it('Successfully gets the min Temperature for oxford 2018', async () =>{
		const location = 'oxford';
		const year = 2018;

		const result = await getMinTemperature({location:location, year:year});

		expect(result).toEqual(0.3);
	});
  it('Returns 0 if the function would error', async() => {
		// if API does not support input:
		const location = 'london';
		const year = 2018;
		const result = await getMinTemperature({location:location, year:year});
		expect(result).toEqual(0)
	});
})
