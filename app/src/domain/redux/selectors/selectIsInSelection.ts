import { numberIsInRangeArray } from '../../shared/utils';
import { AppState } from '../types';

import selectSelections from './selectSelections';

export const selectIsInSelection = (state: AppState, charIndex: number): boolean => {
  const selections = selectSelections(state);

  if (!selections) {
    return false;
  }

  return numberIsInRangeArray(charIndex, selections);
};
