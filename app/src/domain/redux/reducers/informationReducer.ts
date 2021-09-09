import { Action, AppState } from '../types';

const initialState: AppState = {
  information: undefined,
  selections: [],
  isSelectionsValidated: false,
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

    case 'set-selections-validated':
      return {
        ...state,
        isSelectionsValidated: action.payload,
      };

    case 'clear-selections':
      return {
        ...state,
        selections: [],
      };

    default:
      return state;
  }
};

export default informationReducer;
