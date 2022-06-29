import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import weatherReducer from './Reducers/weatherReducers';
import alertReducer from './Reducers/alertReducer';
import listOfCitiesReducer from './Reducers/listOfCitiesReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  alert: alertReducer,
  cityList: listOfCitiesReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;