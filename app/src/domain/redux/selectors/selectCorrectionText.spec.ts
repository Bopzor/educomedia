import { expect } from 'earljs';

import { createCorrection, createDeps } from '../../shared/factories';
import { setCorrection } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import { selectCorrectionText } from './selectCorrectionText';

describe('selectCorrectionText', () => {
  let deps: Dependencies;
  let store: AppStore;

  beforeEach(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('selects the text from the correction for given char index', () => {
    const correction = createCorrection();
    store.dispatch(setCorrection(correction));

    const state = store.getState();

    expect(selectCorrectionText(state, 1)).toEqual(undefined);
    expect(selectCorrectionText(state, 13)).toEqual('1');
  });
});
