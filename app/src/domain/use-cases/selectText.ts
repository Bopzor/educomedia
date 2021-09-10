import { setSelections } from '../redux/actions/misinformationActions';
import type { Dispatch, GetState } from '../redux/types';
import { isOverlappingRange } from '../../utils';
import { Range } from '../types';

const selectText =
  (start: number, end: number) =>
  (dispatch: Dispatch, getState: GetState): void => {
    const { selections } = getState();

    const overlapping: Range[] = findOverlapping([start, end], selections);

    const filteredSelections = selections.filter(
      (item) => !overlapping.find(([start, end]) => start === item[0] && end === item[1]),
    );
    const selection = getSelectionStartEnd([start, end], overlapping);

    dispatch(setSelections([...filteredSelections, selection]));
  };

const findOverlapping = (item: Range, array: Range[]) => {
  const overlapping: Range[] = [];

  for (const [currentStart, currentEnd] of array) {
    if (isOverlappingRange([currentStart, currentEnd], item)) {
      overlapping.push([currentStart, currentEnd]);
    }
  }

  return overlapping;
};

const getSelectionStartEnd = (item: Range, items: Range[]) => {
  const returnedValue: Range = [...item];

  for (const [start, end] of items) {
    if (start < item[0]) {
      returnedValue[0] = start;
    }

    if (end > item[1]) {
      returnedValue[1] = end;
    }
  }

  return returnedValue;
};

export default selectText;
