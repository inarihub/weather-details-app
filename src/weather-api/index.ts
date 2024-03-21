import locations from './locations';
import { LocationNames, WeatherDataCurrent } from './weather.types';
import { Option } from './options.types';

export const getWeather = async (location: LocationNames): Promise<WeatherDataCurrent | undefined> => {
    try {
        const queryString = getWeatherQuery(location);
        const res = await fetch(queryString);
        const data = await res.json();
        console.log(data);
        return data;
    } catch(e) {
        console.log(e);
    }
}

const BASIC_OPTION = { current: ['temperature_2m', 'weather_code'] };

function getWeatherQuery(location: LocationNames, options: Option = BASIC_OPTION) {
    const locationParams = locations[location];
    let queryParamsArr = [];
    const mainURI = 'https://api.open-meteo.com/v1/gfs?';
    for (const kv of Object.entries(locationParams)) {
        const paramString = kv[0] + '=' + encodeURIComponent(kv[1]);
        queryParamsArr.push(paramString);
    }
    for (const kv of Object.entries(options)) {
        const paramString = kv[0] + '=' + kv[1].map(el => encodeURIComponent(el)).join(',');
        queryParamsArr.push(paramString);
    }
    console.log(queryParamsArr);
    return mainURI + queryParamsArr.join('&');
}