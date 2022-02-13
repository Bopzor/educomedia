import { expect } from 'earljs';

import { createDeps, createMisinformation } from '../../shared/factories';
import { setMisinformation, setSelections } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import { selectSelectionsText } from './selectSelectionsText';

describe('selectSelectionsText', () => {
  let store: AppStore;
  let deps: Dependencies;

  beforeEach(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('selects the text of current selections', () => {
    const misinformation = createMisinformation();
    store.dispatch(setMisinformation(misinformation));
    store.dispatch(setSelections([[0, 6]]));

    const state = store.getState();

    expect(selectSelectionsText(state)).toEqual(['content']);
  });
});
