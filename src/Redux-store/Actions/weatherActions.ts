import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {
  WeatherAction,
  WeatherData,
  WeatherError,
  GET_WEATHER,
  DELETE_WEATHER,
  SET_LOADING,
  SET_ERROR,
  TOTAL_DELETE_WEATHER,
  GET_CITY, 
  CityData,
} from '../types';

export const getWeather = (city: string): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?${city}&appid=${'b078a7d81849e7d2b796924e54583a40'}`);
      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }
      const resData: WeatherData = await res.json();
      const cityData: CityData = {
        city: resData.name
      };
      dispatch({
        type: GET_WEATHER,
        payload: resData
      });
      dispatch({
        type: GET_CITY,
        payload: cityData
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

export const getWeatherWhithOutCityList = (city: string): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?${city}&appid=${'b078a7d81849e7d2b796924e54583a40'}`);
      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }
      const resData: WeatherData = await res.json();
      dispatch({
        type: GET_WEATHER,
        payload: resData
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING
  }
}

export const setError = (): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: ''
  }
}

export const setId = (id: number): WeatherAction => {
  return {
    type: DELETE_WEATHER,
    payload: id
  }
}

export const clearWeatherArray= (): WeatherAction => {
  return {
    type: TOTAL_DELETE_WEATHER,
  }
}