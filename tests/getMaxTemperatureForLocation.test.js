const { getMaxTemperatureForLocation } = require('../src/index');

describe('getMaxTemperatureForLocation', () => {
  it('Successfully gets maximum Temperature for all years for location', async () => {
    const location = 'heathrow';
		const result = await getMaxTemperatureForLocation({location:location});
		expect(result).toEqual(28.3);
  });
});
