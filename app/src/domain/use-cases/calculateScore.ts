import { setScore } from '../redux/actions/misinformationActions';
import selectCorrection from '../redux/selectors/selectCorrection';
import selectSelections from '../redux/selectors/selectSelections';
import type { Dispatch, GetState } from '../redux/types';
import { extraInCompareTo, missingInCompareTo } from '../shared/utils';
import { Range } from '../types';

export const calculateScore =
  () =>
  (dispatch: Dispatch, getState: GetState): void => {
    const state = getState();
    const selections = selectSelections(state);
    const correction = selectCorrection(state);

    const correctionCharList: number[] = correction!.corrections
      .map((c) => c.range)
      .reduce(flatRangesToExhaustiveNumbers, [] as number[]);
    const selectionsCharList: number[] = selections.reduce(flatRangesToExhaustiveNumbers, [] as number[]);

    const missing = missingInCompareTo(selectionsCharList, correctionCharList);
    const extra = extraInCompareTo(selectionsCharList, correctionCharList);
    const numberOfErrors = missing.length + extra.length;

    const score = 100 - (numberOfErrors * 100) / correctionCharList.length;

    dispatch(setScore(score >= 0 ? Math.round(score) : 0));
  };

const flatRangesToExhaustiveNumbers = (list: number[], [start, end]: Range): number[] => {
  for (let i = start; i <= end; i++) {
    list.push(i);
  }

  return list;
};
