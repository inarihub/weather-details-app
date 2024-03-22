import { useEffect, useState } from "react";
import { getWeather } from "../weather-api";
import classes from './Weather.module.css';
import WeatherData from "./WeatherContent";
import { WeatherContentProps } from "./WeatherContent.types";
import { NullableWeatherData } from "./Weather.types";

const testLocationName = 'Russia-Moscow';
const msCheckInterval = 60 * 1000;

const Weather = () => {
    const [weatherObj, setWeatherObj] = useState<NullableWeatherData>(null);

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

    const content = weatherObj ? <WeatherData {...weatherObj as WeatherContentProps}/> : <p>No Info</p>

    return (
        <div className={classes.mainWeatherContainer}>
            <p className={classes.locationName}>{testLocationName}</p>
            {content}
            <p className={classes.footer}>Using open-meteo.com</p>
        </div>
    )
}

export default Weather;