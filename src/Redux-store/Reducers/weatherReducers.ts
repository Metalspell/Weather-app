

import { WeatherState, WeatherAction, GET_WEATHER, SET_LOADING, SET_ERROR, DELETE_WEATHER, TOTAL_DELETE_WEATHER, GET_CITY, DELETE_CITY } from "../types";

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: '',
  id: '',
  cityData: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: WeatherAction): WeatherState => {
  switch (action.type) {
    case GET_WEATHER:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
        error: ''
      }
    case GET_CITY:
      return {
        ...state,
        cityData: [...state.cityData, action.payload],
        loading: false,
        error: ''
      }
    case DELETE_WEATHER:
      return {
        ...state,
        data: [
          ...state.data.slice(0, action.payload),
          ...state.data.slice(action.payload + 1)
        ],
      }
    case DELETE_CITY:
      return {
        ...state,
        cityData: [
          ...state.cityData.slice(0, action.payload),
          ...state.cityData.slice(action.payload + 1)
        ],
      }
    case TOTAL_DELETE_WEATHER:
      return {
        ...state,
        data: [],
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
}