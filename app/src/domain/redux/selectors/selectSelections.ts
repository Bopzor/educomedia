import { Range } from '../../types';
import { AppState } from '../types';

const selectSelections = (state: AppState): Range[] => {
  return state.selections;
};

export default selectSelections;
