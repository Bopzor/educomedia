import { expect } from 'earljs';

import { createCorrection, createDeps } from '../../shared/factories';
import { setCorrection } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import { selectIsInCorrection } from './selectIsInCorrection';

describe('selectIsInCorrection', () => {
  let deps: Dependencies;
  let store: AppStore;

  beforeEach(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('returns true if given char index is in correction', () => {
    const correction = createCorrection();
    store.dispatch(setCorrection(correction));

    const state = store.getState();

    const isInCorrection = selectIsInCorrection(state, 13);

    expect(isInCorrection).toEqual(true);
  });

  it('returns false if given char index is not in correction', () => {
    const correction = createCorrection();
    store.dispatch(setCorrection(correction));

    const state = store.getState();

    const isInCorrection = selectIsInCorrection(state, 1);

    expect(isInCorrection).toEqual(false);
  });
});
