const { getAverageSunHoursForLocation } = require('../src/index');

describe('getAverageSunHoursForLocation', () => {
  it('Successfully gets average sun hours for all years', async () => {
    const location = 'oxford';
    const result = await getAverageSunHoursForLocation({location: location});
    expect(result).toEqual(128.1);
  });
});
