const {getMinTemperature} = require('../src/index')

describe('getMinTemperature', () => {
	it('Successfully gets the min Temperature for oxford 2018', async () =>{
		const location = 'oxford';
		const year = 1853;

		const result = await getMinTemperature({location:location, year:year});

		expect(result).toEqual(-1.8);
	})
})
