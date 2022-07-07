export const GET_WEATHER = 'GET_WEATHER';
export const DELETE_WEATHER = 'DELETE_WEATHER';
export const TOTAL_DELETE_WEATHER = 'TOTAL_DELETE_WEATHER';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_ALERT = 'SET_ALERT';
export const GET_CITY = 'GET_CITY';
export const DELETE_CITY = 'DELETE_CITY';

export interface Weather {
  id: number;
  description: string;
  main: string;
  icon: string;
  linkToWeatherImage: string;

}

export interface WeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface CityData {
  city: string;
}

export interface InputProps {
  title: string;
  cityData: CityData[];
  weatherData: WeatherData[];
}

export interface AlertProps {
  message: string;
  onClose: () => void
}

export interface WeatherError {
  cod: string;
  message: string;
}

export interface WeatherState {
  data: WeatherData[] | [];
  loading: boolean;
  error: string;
  id: string;
  cityData: CityData[] | [];
}

export interface CityListState {
  data: CityData[] | [];
}

interface GetCityListAction {
  type: typeof GET_CITY;
  payload: CityData;
}

interface DeleteCityListAction {
  type: typeof DELETE_CITY;
  payload: number;
}

interface GetWeatherAction {
  type: typeof GET_WEATHER;
  payload: WeatherData;
}

interface DeleteWeatherAction {
  type: typeof DELETE_WEATHER;
  payload: number;
}

interface TotalDeleteWeatherAction {
  type: typeof TOTAL_DELETE_WEATHER;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type WeatherAction = GetWeatherAction | GetCityListAction| DeleteWeatherAction | TotalDeleteWeatherAction | SetLoadingAction | SetErrorAction| DeleteCityListAction;

export interface AlertAction {
  type: typeof SET_ALERT;
  payload: string;
}

export interface AlertState {
  message: string;
}
