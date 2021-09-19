import { setInformationTitle } from '../redux/actions/misinformationActions';
import type { ThunkResult } from '../redux/types';

const accessInformationTitle =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { informationGateway }): Promise<void> => {
    const misinformation = getState().misinformation;

    if (!misinformation) {
      return;
    }

    const title: string = await informationGateway.accessTitle(misinformation.informationId);

    dispatch(setInformationTitle(title));
  };

export default accessInformationTitle;
