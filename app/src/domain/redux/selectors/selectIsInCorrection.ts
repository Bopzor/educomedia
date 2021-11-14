import { numberIsInRangeArray } from '../../shared/utils';
import { AppState } from '../types';

import selectCorrection from './selectCorrection';

export const selectIsInCorrection = (state: AppState, charIndex: number): boolean => {
  const correction = selectCorrection(state);

  if (!correction) {
    return false;
  }

  const correctionRanges = correction.corrections.map(({ range }) => range);

  return numberIsInRangeArray(charIndex, correctionRanges);
};
