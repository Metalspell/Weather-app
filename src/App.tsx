import React, { FC } from 'react';
import './App.css';
import Modal from "react-modal";
import { QueryClient, QueryClientProvider } from 'react-query';
import { RootState } from './Redux-store';
import Input from './Components/Input/Input';
import WeatherOutput from './Components/WeatherOutput/WeatherOutput';
import { setAlert } from './Redux-store/Actions/alertActions';
import { setError } from './Redux-store/Actions/weatherActions';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from './Components/ModalWindowOfAlert/ModalWindow';

const queryClient = new QueryClient()

const App: FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const cityData = useSelector((state: RootState) => state.cityList.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);

  return (
    <div className="App">
      <Input error={error} cityData={cityData} weatherData={weatherData} title="Enter city name and press search button or use automatic location detection" />
      {loading ? <h2 className="loading">Loading...</h2> : weatherData && <WeatherOutput data={weatherData} city={cityData} />}

      {alertMsg &&
        <QueryClientProvider client={queryClient}>
          <Modal
            ariaHideApp={false}
            isOpen={true}
            overlayClassName={{
              base: "overlay-base",
              afterOpen: "overlay-after",
              beforeClose: "overlay-before"
            }}
            className={{
              base: "content-base",
              afterOpen: "content-after",
              beforeClose: "content-before"
            }}
          >
            <ModalWindow message={alertMsg} onClose={() => dispatch(setAlert(''))} />
          </Modal>
        </QueryClientProvider>
      }
      {error &&
        <QueryClientProvider client={queryClient}>
          <Modal
            ariaHideApp={false}
            isOpen={true}
            overlayClassName={{
              base: "overlay-base",
              afterOpen: "overlay-after",
              beforeClose: "overlay-before"
            }}
            className={{
              base: "content-base",
              afterOpen: "content-after",
              beforeClose: "content-before"
            }}
          >
            <ModalWindow message={error} onClose={() => dispatch(setError())} />
          </Modal>
        </QueryClientProvider>
      }
    </div>
  );
}

export default App;
