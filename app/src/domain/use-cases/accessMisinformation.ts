import { Misinformation } from '../entities/misinformation';
import { setMisinformation } from '../redux/actions/misinformationActions';
import type { ThunkResult } from '../redux/types';

import accessInformationTitle from './accessInformationTitle';

const accessMisinformation =
  (id: string): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { misinformationGateway }): Promise<void> => {
    const misinformation: Misinformation = await misinformationGateway.accessMisinformation(id);

    dispatch(setMisinformation(misinformation));

    dispatch(accessInformationTitle());
  };

export default accessMisinformation;
