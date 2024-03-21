import { useEffect, useState } from "react";
import { getWeather } from "../weather-api";
import classes from './Weather.module.css';
import { codesMap } from "../weather-api/weathercodes";
import iconsLib from "../weather-api/icons";
import { WeatherDataCurrent } from "../weather-api/weather.types";

type NullableWeatherDataCurrent = WeatherDataCurrent | null;
type ParsedWeatherData = {
    tempString: string,
    weatherDescString: string,
    weatherIcon: string | undefined
}

const testLocationName = 'Russia-Moscow';
const msCheckInterval = 60 * 1000;

function parseDataFromWeatherObject(obj: WeatherDataCurrent) {
    const defaultRes: ParsedWeatherData =  {
        tempString: '',
        weatherDescString: '',
        weatherIcon: undefined
    }
    // PLACE TO API
    if (obj) {
        const temp = obj.current.temperature_2m;
        const tempUnits = obj.current_units.temperature_2m;
        defaultRes.tempString = Math.round(temp) + tempUnits;

        const descriptors = codesMap.get(obj.current.weather_code);
        defaultRes.weatherDescString = descriptors ? descriptors[0] : '';
        defaultRes.weatherIcon = descriptors ? iconsLib[descriptors[1]] : undefined;
    }

    return obj ? {} : defaultRes
}

const Weather = () => {
    const [weatherObj, setWeatherObj] = useState<NullableWeatherDataCurrent>(null);

    useEffect(() => {
        fetchWeatherDataAsync();

        const updateTimer = setInterval(fetchWeatherDataAsync, msCheckInterval);

        return () => { clearInterval(updateTimer); };
    }, [])

    const fetchWeatherDataAsync = async () => {
        const newData = await getWeather(testLocationName);

        if (newData) {
            setWeatherObj(newData);
        }
    }

    const LOADING_STRING = 'Loading...'

    let tempString = LOADING_STRING;
    let weatherDescString = LOADING_STRING;
    let weatherIcon;

    if (weatherObj) {
        const tempUnits = weatherObj.current_units.temperature_2m;
        const temp = weatherObj.current.temperature_2m;
        tempString = Math.round(temp) + tempUnits;
        const descriptors = codesMap.get(weatherObj.current.weather_code);
        if (descriptors) {
            weatherDescString = descriptors[0];
            weatherIcon = iconsLib[descriptors[1]];
        }
    }

    return (
        <div className={classes.mainWeatherContainer}>
            <p className={classes.title}>{testLocationName}:</p>
            <img src={weatherIcon}></img>
            <p className={classes.temperature}>{tempString}</p>
            <p className={classes.description}>{weatherDescString}</p>
        </div>
    )
}

export default Weather;