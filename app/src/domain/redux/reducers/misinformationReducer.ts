import { Action, AppState } from '../types';

const initialState: AppState = {
  misinformation: undefined,
  selections: [],
  isSelectionsValidated: false,
  correction: undefined,
  informationTitle: undefined,
};

const misinformationReducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case 'set-information-title':
      return {
        ...state,
        informationTitle: action.payload,
      };

    case 'set-misinformation':
      return {
        ...state,
        misinformation: action.payload,
      };

    case 'set-correction':
      return {
        ...state,
        correction: action.payload,
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

    case 'set-score':
      return {
        ...state,
        score: action.payload,
      };

    default:
      return state;
  }
};

export default misinformationReducer;
