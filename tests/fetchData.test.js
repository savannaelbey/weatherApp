const { fetchData } = require('../src/index');

describe('fetchData', () => {
  it('returns the weather data for that year and location when a valid location and year are inputed', async () => {
    const location = 'oxford';
    const year = 1853;
    const result = await fetchData(location, year);
    expect(result).toEqual([
        {
            "year": 1853,
            "month": 1,
            "temperature_max": 8.4,
            "temperature_min": 2.7,
            "ad_days": 4,
            "rain": 62.8,
            "sun": null
        },
        {
            "year": 1853,
            "month": 2,
            "temperature_max": 3.2,
            "temperature_min": -1.8,
            "ad_days": 19,
            "rain": 29.3,
            "sun": null
        },
        {
            "year": 1853,
            "month": 3,
            "temperature_max": 7.7,
            "temperature_min": -0.6,
            "ad_days": 20,
            "rain": 25.9,
            "sun": null
        },
        {
            "year": 1853,
            "month": 4,
            "temperature_max": 12.6,
            "temperature_min": 4.5,
            "ad_days": 0,
            "rain": 60.1,
            "sun": null
        },
        {
            "year": 1853,
            "month": 5,
            "temperature_max": 16.8,
            "temperature_min": 6.1,
            "ad_days": 0,
            "rain": 59.5,
            "sun": null
        },
        {
            "year": 1853,
            "month": 6,
            "temperature_max": 20.1,
            "temperature_min": 10.7,
            "ad_days": 0,
            "rain": 82,
            "sun": null
        },
        {
            "year": 1853,
            "month": 7,
            "temperature_max": 21.2,
            "temperature_min": 12.2,
            "ad_days": 0,
            "rain": 86.2,
            "sun": null
        },
        {
            "year": 1853,
            "month": 8,
            "temperature_max": 20.2,
            "temperature_min": 10.8,
            "ad_days": 0,
            "rain": 72.3,
            "sun": null
        },
        {
            "year": 1853,
            "month": 9,
            "temperature_max": 17.3,
            "temperature_min": 8.4,
            "ad_days": 0,
            "rain": 51.3,
            "sun": null
        },
        {
            "year": 1853,
            "month": 10,
            "temperature_max": 13.9,
            "temperature_min": 7.4,
            "ad_days": 0,
            "rain": 102.3,
            "sun": null
        },
        {
            "year": 1853,
            "month": 11,
            "temperature_max": 8.7,
            "temperature_min": 2.3,
            "ad_days": 10,
            "rain": 49.6,
            "sun": null
        },
        {
            "year": 1853,
            "month": 12,
            "temperature_max": 3.7,
            "temperature_min": -1.3,
            "ad_days": 19,
            "rain": 10.7,
            "sun": null
        }
    ]);
  });
  it('returns the amount of years that are available for that locations when a valid location and a 0 are passed in as arguments', async () => {
    const location = 'oxford';
    const result = await fetchData(location, 0);
    expect(result).toEqual({
        "startYear": 1853,
        "endYear": 2018
    });
  });
  it('returns "error" if an error is caught', async () => {
    const location = 'oxfford'
    const year = 2018;
    const result = await fetchData(location, year);
    expect(result).toEqual('error');
  });
});
