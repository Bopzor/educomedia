import { Correction } from '../../entities/correction';
import { AppState } from '../types';

const selectCorrection = (state: AppState): Correction | undefined => {
  return state.correction;
};

export default selectCorrection;
