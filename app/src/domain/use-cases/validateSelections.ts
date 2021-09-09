import { setSelectionsValidated } from '../redux/actions/informationActions';
import type { Dependencies, Dispatch, GetState } from '../redux/types';

const validateSelections =
  () =>
  async (dispatch: Dispatch, getState: GetState, { informationGateway }: Dependencies): Promise<void> => {
    const { selections } = getState();

    await informationGateway.validateSelections(selections);

    dispatch(setSelectionsValidated(true));
  };

export default validateSelections;
