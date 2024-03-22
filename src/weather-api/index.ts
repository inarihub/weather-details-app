import locations from './locations';
import { LocationNames, WeatherDataCurrent } from './weather.types';
import { Option } from './options.types';
import iconsLib from './icons';
import { codesMap } from './weathercodes';

export const getWeather = async (location: LocationNames): Promise<ParsedWeatherData | undefined> => {
    try {
        const queryString = getWeatherQuery(location);
        const res = await fetch(queryString);
        const data = await res.json();
        const result = parseDataFromWeatherObject(data);
        return result;
    } catch (e) {
        console.log(e);
    }
}

const BASIC_OPTION = { current: ['temperature_2m', 'weather_code'] };

function getWeatherQuery(location: LocationNames, options: Option = BASIC_OPTION) {
    
    const locationParams = locations[location];
    const baseQueryString = 'https://api.open-meteo.com/v1/gfs?';
    const locationParamString = getParamQueryPair(locationParams, (key, value) => key + '=' + encodeURIComponent(value));
    const optionsParamString = getParamQueryPair(options, (key, value) => key + '=' + value.map(el => encodeURIComponent(el)).join(','))

    return [
        baseQueryString,
        locationParamString,
        optionsParamString
    ].join('&');
}

function getParamQueryPair<T extends Record<string, any>>(paramObj: T, callback: (key: keyof T, value: T[keyof T]) => string): string {
    let res: string[] = [];
    for (const kv of Object.entries(paramObj)) {
        console.log(kv[0]);
        const paramString = callback(kv[0], kv[1]);
        res.push(paramString);
    }
    return res.join('&');
}

export type ParsedWeatherData = {
    tempString: string,
    weatherDescString: string,
    weatherIcon: string
}

function parseDataFromWeatherObject(obj: WeatherDataCurrent): ParsedWeatherData {

    if (!obj) {
        throw Error('Weather data is invalid');
    }

    const descriptors = codesMap.get(obj.current.weather_code);

    if (!descriptors || !iconsLib[descriptors[1]]) {
        throw Error('Weather descriptor is missed');
    }

    const temp = obj.current.temperature_2m;
    const tempUnits = obj.current_units.temperature_2m;
    const tempString = Math.round(temp) + tempUnits;
    const weatherDescString = descriptors[0];
    const weatherIcon = iconsLib[descriptors[1]];

    return {
        tempString,
        weatherDescString,
        weatherIcon
    }
}