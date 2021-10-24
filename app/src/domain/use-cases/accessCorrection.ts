import { setCorrection } from '../redux/actions/misinformationActions';
import selectMisinformation from '../redux/selectors/selectMisinformation';
import type { ThunkResult } from '../redux/types';

export const accessCorrection =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { misinformationGateway }): Promise<void> => {
    const misinformation = selectMisinformation(getState());

    const correction = await misinformationGateway.accessCorrection(misinformation!.id);

    dispatch(setCorrection(correction));
  };
