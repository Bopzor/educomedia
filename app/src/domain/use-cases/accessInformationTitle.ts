import { setInformationTitle } from '../redux/actions/misinformationActions';
import type { ThunkResult } from '../redux/types';

// TODO: Should this take this information.id in parameters instead of getting it from the misinformation in the store?
export const accessInformationTitle =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { informationGateway }): Promise<void> => {
    const misinformation = getState().misinformation;

    if (!misinformation) {
      return;
    }

    const title: string = await informationGateway.accessTitle(misinformation.informationId);

    dispatch(setInformationTitle(title));
  };
