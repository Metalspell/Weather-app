import { GET_CITY, CityListAction, CityData, DELETE_CITY } from '../types';

export const getCity = (city: string): CityListAction => {
  const data: CityData = {
    city: city
  };
  return {
    type: GET_CITY,
    payload: data
  }
}

export const deleteCity = (id: number): CityListAction => {
  return {
    type: DELETE_CITY,
    payload: 0
  }
}