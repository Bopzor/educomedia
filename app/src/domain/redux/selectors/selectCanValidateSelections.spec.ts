import { expect } from 'earljs';

import { createDeps } from '../../shared/factories';
import { setSelections } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import selectCanValidateSelections from './selectCanValidateSelections';

describe('selectCanValidateSelections', () => {
  let deps: Dependencies;
  let store: AppStore;

  beforeEach(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('selects that the selections can be validated', () => {
    store.dispatch(setSelections([[0, 1]]));

    const state = store.getState();

    expect(selectCanValidateSelections(state)).toEqual(true);
  });

  it('selects that the selections can not be validated', () => {
    const state = store.getState();

    expect(selectCanValidateSelections(state)).toEqual(false);
  });
});
