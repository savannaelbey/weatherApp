const { getMinTemperatureForLocation } = require('../src/index');

describe('getMinTemperatureForLocation', () => {
  it('Successfully gets minimum Temperature for all years for location', async () => {
    const location = 'heathrow';
    const result = await getMinTemperatureForLocation({location:location});
    expect(result).toEqual(-4.6);
  });
});
