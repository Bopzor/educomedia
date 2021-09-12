import { Misinformation } from '../../entities/misinformation';
import { AppState } from '../types';

const selectMisinformation = (state: AppState): Misinformation | undefined => {
  return state.misinformation;
};

export default selectMisinformation;
