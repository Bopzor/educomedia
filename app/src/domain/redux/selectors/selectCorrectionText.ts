import { Correction } from 'src/domain/entities/correction';

import { numberIsInRangeArray } from '../../shared/utils';
import { AppState } from '../types';

import selectCorrection from './selectCorrection';
import { selectIsInCorrection } from './selectIsInCorrection';

export const selectCorrectionText = (state: AppState, charIndex: number): string | undefined => {
  const isInCorrection = selectIsInCorrection(state, charIndex);

  if (!isInCorrection) {
    return;
  }

  const correction = selectCorrection(state) as Correction;

  for (const { range, text } of correction.corrections) {
    if (numberIsInRangeArray(charIndex, [range])) {
      return text;
    }
  }
};
