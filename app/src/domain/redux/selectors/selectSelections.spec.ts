import { expect } from 'earljs';

import { createDeps } from '../../shared/factories';
import { setSelections } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import selectSelections from './selectSelections';

describe('selectSelections', () => {
  let store: AppStore;
  let deps: Dependencies;

  before(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('selects the selections', () => {
    let state = store.getState();

    expect(selectSelections(state)).toEqual([]);

    store.dispatch(setSelections([[0, 3]]));

    state = store.getState();

    expect(selectSelections(state)).toBeAnArrayWith([0, 3]);
  });
});
