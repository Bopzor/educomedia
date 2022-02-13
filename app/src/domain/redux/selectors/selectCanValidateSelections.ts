import { AppState } from '../types';

import selectSelections from './selectSelections';

const selectCanValidateSelections = (state: AppState): boolean => {
  return Boolean(selectSelections(state).length > 0);
};

export default selectCanValidateSelections;
