import React, { FC, useEffect, useState } from 'react';
import { WeatherData, CityData } from '../../Redux-store/types';
import style from './WeatherOutput.module.css';
import { MdOutlineClose } from 'react-icons/md';
import { RiCelsiusFill } from 'react-icons/ri';
import { RiFahrenheitFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { setId } from '../../Redux-store/Actions/weatherActions';
import { deleteCity } from '../../Redux-store/Actions/listOfCitiesActions';

interface WeatherProps {
  data: WeatherData[];
  city: CityData[];
}

type WeatherImage = {
  [key: string]: string;
};

const WeatherOutput: FC<WeatherProps> = ({ data, city }) => {
  const dispatch = useDispatch();
  const [temperatureState, setTemperatureState] = useState<string>('');
  const [celsiusOrFahrengeit, setCelsiusOrFahrengeit] = useState<boolean>(true);
  const [img, setImage] = useState('');
  let counters = [];

  const days = ['Monday ', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const month = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  const date = new Date();
  const dateOfMonth = date.getDate();

  const submitHandler = (e: React.MouseEvent<SVGAElement>) => {
    e.preventDefault();
    dispatch(setId(+e.currentTarget.id));
    dispatch(deleteCity(+e.currentTarget.id));
  }

  useEffect(() => {
    const arrayOfWeatherImage: WeatherImage = {
      'clear sky': 'https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_960_720.jpg',
      'few clouds': 'https://c4.wallpaperflare.com/wallpaper/980/878/553/few-clouds-sky-wallpaper-preview.jpg',
      'light rain': 'https://i.tribune.com.pk/media/images/698341-deadlyrain-1398055116/698341-deadlyrain-1398055116.jpg',
      'overcast clouds': 'https://www.photos-public-domain.com/wp-content/uploads/2012/04/cloudy-overcast-sky.jpg',
      'scattered clouds': 'https://media.istockphoto.com/photos/cirrocumulus-clouds-cloudscape-picture-id645173476?b=1&k=20&m=645173476&s=170667a&w=0&h=0wdytj1LA3mA1Jzp0j6_rgip60BxH9e5BAAE_vFlJQE=',
      'broken clouds': 'https://live.staticflickr.com/4892/44794073965_2b17a620ca_b.jpg',
      'shower rain': 'https://s7d2.scene7.com/is/image/TWCNews/rain_jpg-28',
      'rain': 'https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/rain-drops-on-window-1827098_1920.jpg?strip=1',
      'thunderstorm': 'data:image/jpeg;base64,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',
      'snow': 'https://www.mercurynews.com/wp-content/uploads/2022/02/hypatia-h_d2337027fcc69b6c6843da2f82176c46-h_23acfa2e1b565b5c41d00d2091b705bc.jpg',
      'mist': 'data:image/jpeg;base64,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',
      'moderate rain': 'http://images.gmanews.tv/webpics/2015/09/rainfall_2015_09_14_11_23_49.jpg',
    };
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        for (let key in arrayOfWeatherImage) {
          if (key === data[i].weather[0].description) {
            data[i].weather[0].linkToWeatherImage = arrayOfWeatherImage[key];
            setImage(data[i].weather[0].linkToWeatherImage)
          }
        }
      }
    }
  }, [data, img, city]);

  const temperatureSelector = (e: React.MouseEvent) => {
    e.preventDefault();
    setTemperatureState(e.currentTarget.id);
  }

  const fahrenheitOrCelsius = (e: React.MouseEvent) => {
    e.preventDefault();
    setCelsiusOrFahrengeit(false);
  }
  const celsiusOrFahrenheit = (e: React.MouseEvent) => {
    e.preventDefault();
    setCelsiusOrFahrengeit(true);
  }

  return (
    <>
      {data.length > 0 ?
        <section>
          <div className={style.typeOfTemp}>
            <h1>Select the temperature display type:</h1>
            <div
              id={'celsius'}
              className={style.celsius}
              onClick={(e) => {temperatureSelector(e); celsiusOrFahrenheit(e);}}
            >
              <span>
                &#8451;
              </span>
            </div>
            |
            <div
              id={'fahrenheit'}
              className={style.fahrenheit}
              onClick={(e) => {temperatureSelector(e); fahrenheitOrCelsius(e);}}
            >
              <span>
                &#8457;
              </span>
            </div>
          </div>
        </section>
        : null}
      <section className={style.section}>
        {data.map((item, i) => {
          counters.push(i);
          return (
            <div key={i}
              className={style.item}
              style={{ background: `url(${item.weather[0].linkToWeatherImage}) no-repeat center center / cover` }}
            >
              <div className={style.city_Date_TypeOfWeather}>
                <div className={style.cityAndDate}>
                  <h1 className={style.title}>{item.name} - {item.sys.country}</h1>
                  <h3 className={style.date}>{`${days[date.getDay()]}, ${dateOfMonth} ${month[date.getMonth()]}, 
              ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`}</h3>
                </div>
                <div className={style.typeOfWeatherWrapper}>
                  <div className={style.typeOfWeather}>
                    <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" />
                    <p className="heading">{item.weather[0].description}</p>
                  </div>
                  <MdOutlineClose id={`${i}`} onClick={submitHandler} className={style.closeIcon} />
                </div>
              </div>
              <div className={style.mainData}>
                <div className="temperature">
                  <div>
                    <div className={style.temperatureData}>
                      <p className={style.temperatureValue}>
                        {+(item.main.temp - 273.15).toFixed(2) > 0 || +(item.main.temp * 1.8 - 459.67).toFixed(2) > 0 ? '+' : '-'}
                        {temperatureState === '' ? `${(data[i].main.temp - 273.15).toFixed(2)}` :
                          temperatureState === 'celsius' ? `${(data[i].main.temp - 273.15).toFixed(2)}` : `${(item.main.temp * 1.8 - 459.67).toFixed(2)}`}
                      </p>
                      {celsiusOrFahrengeit
                        ?
                        <RiCelsiusFill className={style.temperatureTypeIcon} />
                        :
                        <RiFahrenheitFill className={style.temperatureTypeIcon} />
                      }
                    </div>
                  </div>
                </div>
                <div className={style.anotherValues}>
                  <div className="level-item">
                    <div>
                      <p className={style.heading}>Humidity: </p>
                      <p className="title">{item.main.humidity}</p>
                    </div>
                  </div>
                  <div className="level-item">
                    <div>
                      <p className={style.heading}>Pressure: </p>
                      <p className="title">{item.main.pressure}</p>
                    </div>
                  </div>
                  <div className="level-item">
                    <div>
                      <p className={style.heading}>Wind: </p>
                      <p className="title">{item.wind.speed} m/s</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }
      </section>
    </>
  );
}

export default WeatherOutput;