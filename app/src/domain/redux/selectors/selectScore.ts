import { AppState } from '../types';

const selectScore = (state: AppState): number | undefined => {
  return state.score;
};

export default selectScore;
