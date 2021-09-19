import { AppState } from '../types';

const selectInformationTitle = (state: AppState): string | undefined => {
  return state.informationTitle;
};

export default selectInformationTitle;
