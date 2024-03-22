import clear from './icons/clear.png';
import fog from './icons/fog.png';
import cloudy from './icons/cloudy.png';
import light_rain from './icons/light_rain.png';
import light_snow from './icons/light_snow.png';
import mostly_cloudy from './icons/mostly_cloudy.png';
import rain from './icons/rain.png';
import snow from './icons/snow.png';
import storm from './icons/storm.png';
import strong_wind from './icons/strong_wind.png';

export interface IconLibrary {
    [key: string]: string
}

const iconsLib: IconLibrary = { clear, fog, cloudy, light_rain, light_snow, mostly_cloudy, rain, snow, storm, strong_wind };

export default iconsLib;
