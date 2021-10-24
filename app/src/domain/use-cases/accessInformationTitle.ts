import { setInformationTitle } from '../redux/actions/misinformationActions';
import selectMisinformation from '../redux/selectors/selectMisinformation';
import type { ThunkResult } from '../redux/types';

export const accessInformationTitle =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { informationGateway }): Promise<void> => {
    const misinformation = selectMisinformation(getState());

    if (!misinformation) {
      return;
    }

    const title: string = await informationGateway.accessTitle(misinformation.informationId);

    dispatch(setInformationTitle(title));
  };
