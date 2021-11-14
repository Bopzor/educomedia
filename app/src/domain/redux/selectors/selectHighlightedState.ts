import { AppState } from '../types';

import selectCorrection from './selectCorrection';
import { selectIsInCorrection } from './selectIsInCorrection';
import { selectIsInSelection } from './selectIsInSelection';

export enum HighlightedState {
  success = 'success',
  correction = 'correction',
  error = 'error',
  default = 'default',
}

export const selectHighlightedState = (state: AppState, charIndex: number): HighlightedState | undefined => {
  const correction = selectCorrection(state);
  const isInSelection = selectIsInSelection(state, charIndex);
  const isInCorrection = selectIsInCorrection(state, charIndex);

  if (isInSelection && isInCorrection) {
    return HighlightedState.success;
  }

  if (isInCorrection) {
    return HighlightedState.correction;
  }

  if (correction && isInSelection) {
    return HighlightedState.error;
  }

  if (isInSelection) {
    return HighlightedState.default;
  }

  return undefined;
};
