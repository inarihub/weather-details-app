export type Option = {
    [key in OptionsValue]: CurrentVariables[];
};

export type OptionsValue = 'current';

// if this is const enum, use as const
const currentVars = ['temperature_2m', 'relative_humidity_2m', 'apparent_temperature,is_day', 'precipitation',
'rain', 'showers', 'snowfall', 'weather_code', 'cloud_cover', 'pressure_msl', 'surface_pressure', 'wind_speed_10m',
'wind_direction_10m', 'wind_gusts_10m'];

export type CurrentVariables =  typeof currentVars[number];