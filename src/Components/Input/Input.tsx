import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InputProps } from '../../Redux-store/types';
import style from './Input.module.css';
import { setAlert } from '../../Redux-store/Actions/alertActions';
import { getWeather, setLoading, clearWeatherArray, getWeatherWhithOutCityList } from '../../Redux-store/Actions/weatherActions';

const Input: FC<InputProps> = ({ title, cityData, weatherData }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [cityFromCurrentLocation, setCityFromCurrentLocation] = useState('');


  const formInput = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1));
  }

  const RefreshData = () => {
    if (cityData.length === 0) {
      dispatch(setAlert("You must enter at least one city"));
    } else {
      for (let i = 0; i < cityData.length; i++) {
        dispatch(clearWeatherArray());
      }
      for (let i = 0; i < cityData.length; i++) {
        dispatch(setLoading());
        dispatch(getWeatherWhithOutCityList(`q=${cityData[i].city}`));
      }
    }
  }

  const myLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, error);
    }

    function error() {
      dispatch(setAlert("Your location isn't available to us and we cannot show weather data"));
    }

    function showPosition(positions: any) {
      const lat = positions.coords.latitude;
      const long = positions.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${'b078a7d81849e7d2b796924e54583a40'}`)
        .then((response) => response.json())
        .then((responseJson) => {
          (async function () {
            await setCityFromCurrentLocation(responseJson.name);
          })();
        })
      if (weatherData.length === 0) {
        dispatch(setLoading());
        dispatch(getWeather(`lat=${lat}&lon=${long}`));
      } else {
        let dublicate = false;
        for (let i = 0; i < weatherData.length; i++) {
          if (weatherData[i].name === cityFromCurrentLocation) {
            dispatch(setAlert("You already have this city on your list"));
            dublicate = true;
          }
        }
        if (!dublicate) {
          dispatch(getWeather(`lat=${lat}&lon=${long}`));
        }
      }
    }
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() === '') {
      return dispatch(setAlert('City is required!'));
    }
    if (weatherData.length === 0) {
      dispatch(setLoading());
      dispatch(getWeather(`q=${city.trim()}`));
    }
    if (weatherData.length !== 0) {
      let dublicate = false;
      for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].name === city) {
          dispatch(setAlert("You already have this city on your list"));
          dublicate = true;
        }
      }
      if (!dublicate) {
        dispatch(setLoading());
        dispatch(getWeather(`q=${city.trim()}`));
      }
    }
    setCity('');
  }

  useEffect(() => {
    console.log(cityData);
    console.log(weatherData);
  }, [cityData, weatherData]);

  return (
    <div className={style.mainContainer}>
      <h1 className={style.tytle}>{title}</h1>
      <form className={style.form} onSubmit={submitHandler}>
        <input
          type="text"
          className={style.formField}
          placeholder="Enter city name"
          spellCheck="false"
          value={city}
          onChange={formInput}
        />
        <button className={style.button}>Search</button>
      </form>
      <div className={style.buttonsWrapper}>
        <button className={style.button} onClick={myLocation}>My present location</button>
        <button className={style.button} onClick={RefreshData}>Refresh info</button>
      </div>
    </div>
  );
}

export default Input;
