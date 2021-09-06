import { Information } from '../entities/information';
import { setInformation } from '../redux/actions/informationActions';
import type { ThunkResult } from '../redux/types';

const accessInformation =
  (id: string): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { informationGateway }): Promise<void> => {
    const information: Information = await informationGateway.accessInformation(id);

    dispatch(setInformation(information));
  };

export default accessInformation;
