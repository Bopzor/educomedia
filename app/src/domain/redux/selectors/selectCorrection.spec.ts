import { expect } from 'earljs';

import { createCorrection, createDeps } from '../../shared/factories';
import { setCorrection } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import selectCorrection from './selectCorrection';

describe('selectCorrection', () => {
  let store: AppStore;
  let deps: Dependencies;

  before(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('selects the correction', () => {
    let state = store.getState();

    expect(selectCorrection(state)).toEqual(undefined);

    const correction = createCorrection();
    store.dispatch(setCorrection(correction));

    state = store.getState();

    expect(selectCorrection(state)).toEqual(correction);
  });
});
