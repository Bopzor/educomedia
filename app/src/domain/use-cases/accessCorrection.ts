import { setCorrection } from '../redux/actions/misinformationActions';
import type { ThunkResult } from '../redux/types';

export const accessCorrection =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { misinformationGateway }): Promise<void> => {
    const { misinformation } = getState();

    const correction = await misinformationGateway.accessCorrection(misinformation!.id);

    dispatch(setCorrection(correction));
  };
