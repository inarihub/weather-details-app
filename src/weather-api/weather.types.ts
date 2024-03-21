import locations from "./locations"

export interface WeatherDataCurrent {
    current: WeatherCurrentObject,
    current_units: WeatherCurrentUnitsObject,
    elevation: number,
    generationtime_ms: number,
    latitude: number,
    longitude: number,
    timezone: string,
    timezone_abbreviation: string,
    utc_offset_seconds: number
}

export interface WeatherCurrentObject {
    time: string,
    interval: number,
    temperature_2m: number,
    weather_code: number
}

export interface WeatherCurrentUnitsObject {
    time: string,
    interval: string,
    temperature_2m: string,
    weather_code: string
}

export type Locations = {
    [key in LocationNames]: LocationData;
}

export type LocationData = {
    latitude: number,
    longitude: number,
    timezone: string
}

export type LocationNames = keyof typeof locations;