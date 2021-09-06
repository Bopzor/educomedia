import { setSelections } from '../redux/actions/informationActions';
import type { Dependencies, Dispatch, GetState } from '../redux/types';

const selectText =
  (start: number, end: number) =>
  (dispatch: Dispatch, getState: GetState, { informationGateway }: Dependencies): void => {
    const { information, selections } = getState();

    dispatch(setSelections(selections));
  };

export default selectText;
