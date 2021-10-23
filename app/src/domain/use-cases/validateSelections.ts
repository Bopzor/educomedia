import { setSelectionsValidated } from '../redux/actions/misinformationActions';
import type { Dispatch } from '../redux/types';

import { accessCorrection } from './accessCorrection';
import { calculateScore } from './calculateScore';

export const validateSelections =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(setSelectionsValidated(true));

    await dispatch(accessCorrection());

    dispatch(calculateScore());
  };
