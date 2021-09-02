import { Actions } from '../actions';
import { Action, AppState } from '../types';

const initialState = {};

const informationReducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.setInformation:
      return {
        ...state,
        information: action.payload,
      };

    default:
      return state;
  }
};

export default informationReducer;
