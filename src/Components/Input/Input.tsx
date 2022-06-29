import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InputProps } from '../../Redux-store/types';
import style from './Input.module.css';
import { setAlert } from '../../Redux-store/Actions/alertActions';
import { getWeather, setLoading, clearWeatherArray } from '../../Redux-store/Actions/weatherActions';
import { getCity } from '../../Redux-store/Actions/listOfCitiesActions';

const Input: FC<InputProps> = ({ title, cityData, error, weatherData }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [cityFromPresentLocation, setCityFromPresentLocation] = useState<any | null>(null);

  const formInput = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  }

  const RefreshData = () => {
    for (let i = 0; i < cityData.length; i++) {
      dispatch(clearWeatherArray(cityData.length));
      dispatch(getWeather(`q=${cityData[i].city}`));
    }
  }

  useEffect(() => {
    if (cityFromPresentLocation && weatherData.length !== 0) {
      dispatch(getCity(weatherData[weatherData.length - 1].name));
    }
  }, [weatherData, cityFromPresentLocation, dispatch]);

  const myLocation = () => {
    navigator.geolocation
      ?
      navigator.geolocation.getCurrentPosition(showPosition)
      :
      console.log('Somthing wrong!')
      dispatch(setAlert("Your location isn't available to us and we cannot show weather data"));

    function showPosition(positions: any) {
      const lat = positions.coords.latitude;
      const long = positions.coords.longitude;
      dispatch(getWeather(`lat=${lat}&lon=${long}`));
    }
    setCityFromPresentLocation(true)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() === '') {
      return dispatch(setAlert('City is required!'));
    }
    dispatch(setLoading());
    dispatch(getWeather(`q=${city}`));
    if (error === '') {
      dispatch(getCity(city));
    }
    setCity('');
    setCityFromPresentLocation(false)
  }

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
