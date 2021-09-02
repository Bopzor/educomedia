import { Information } from '../entities/information';
import { setInformation } from '../redux/actions/informationActions';
import type { Dependencies, Dispatch, GetState } from '../redux/types';

const accessInformation =
  (id: string) =>
  async (dispatch: Dispatch, getState: GetState, { informationGateway }: Dependencies): Promise<void> => {
    const information: Information = await informationGateway.accessInformation(id);

    dispatch(setInformation(information));
  };

export default accessInformation;
