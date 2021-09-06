import { Action, AppState } from '../types';

const initialState: AppState = {
  information: undefined,
  selections: [],
};

const informationReducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case 'set-information':
      return {
        ...state,
        information: action.payload,
      };

    case 'set-selections':
      return {
        ...state,
        selections: action.payload,
      };

    default:
      return state;
  }
};

export default informationReducer;
