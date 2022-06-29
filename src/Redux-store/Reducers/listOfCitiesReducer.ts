import { CityListState, CityListAction, GET_CITY, DELETE_CITY } from "../types";

const initialState: CityListState = {
  data: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: CityListAction): CityListState => {
  switch (action.type) {
    case GET_CITY:
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    case DELETE_CITY:
      return {
        ...state,
        data: [
        ...state.data.slice(0, action.payload),
        ...state.data.slice(action.payload + 1),
        ],
      }
    default:
      return state;
  }
}