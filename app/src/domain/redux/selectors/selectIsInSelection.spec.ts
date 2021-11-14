import { expect } from 'earljs';

import { createDeps } from '../../shared/factories';
import { setSelections } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import { selectIsInSelection } from './selectIsInSelection';

describe('selectIsInSelection', () => {
  let deps: Dependencies;
  let store: AppStore;

  beforeEach(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('returns true if given char index is in selection', () => {
    store.dispatch(setSelections([[10, 14]]));
    const state = store.getState();

    const isInSelection = selectIsInSelection(state, 13);

    expect(isInSelection).toEqual(true);
  });

  it('returns false if given char index is not in selection', () => {
    store.dispatch(setSelections([[2, 4]]));
    const state = store.getState();

    const isInSelection = selectIsInSelection(state, 1);

    expect(isInSelection).toEqual(false);
  });
});
