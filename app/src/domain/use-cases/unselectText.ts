import { setSelections } from '../redux/actions/informationActions';
import type { Dispatch, GetState } from '../redux/types';
import { isOverlappingRange } from '../../utils';
import { Range } from '../types';

const unselectText =
  (start: number, end: number) =>
  (dispatch: Dispatch, getState: GetState): void => {
    const { selections } = getState();

    const newSelections: Range[] = selections.reduce((result, selection) => {
      if (start === selection[0] && end === selection[1]) {
        return [...result];
      }

      if (isOverlappingRange([start, end], selection)) {
        const split: Range[] = [];

        if (start > selection[0]) {
          split[0] = [selection[0], start - 1];
        }

        if (end < selection[1]) {
          split.push([end + 1, selection[1]]);
        }

        return [...result, ...split];
      }

      return [...result, selection];
    }, [] as Range[]);

    dispatch(setSelections(newSelections));
  };

export default unselectText;
