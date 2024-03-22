import classes from './WeatherContent.module.css';
import { WeatherContentProps } from './WeatherContent.types';

const WeatherData = (props: WeatherContentProps) => {

    const {weatherIcon, tempString, weatherDescString} = props;

    return (
        <div className={classes.dataContainer}>
            <img src={weatherIcon} alt='...Loading'></img>
            <p className={classes.temperature}>{tempString}</p>
            <p className={classes.description}>{weatherDescString}</p>
        </div>
    )
}

export default WeatherData;