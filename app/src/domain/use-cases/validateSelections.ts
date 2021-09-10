import { setSelectionsValidated } from '../redux/actions/misinformationActions';
import type { Dependencies, Dispatch, GetState } from '../redux/types';

const validateSelections =
  () =>
  async (dispatch: Dispatch, getState: GetState, { misinformationGateway }: Dependencies): Promise<void> => {
    const { selections } = getState();

    await misinformationGateway.validateSelections(selections);

    dispatch(setSelectionsValidated(true));
  };

export default validateSelections;
