const { getAverageSunHours } = require('../src/index');

describe('getAverageSunHours', () => {
  it('Successfully gets average sun hours for a year ', async () => {
    const location = 'oxford';
    const year = 2018;
    const result = await getAverageSunHours({location: location, year: year});
    expect(result).toEqual(147.9);
  });
});
