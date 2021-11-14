import { expect } from 'earljs';

import { createCorrection, createDeps } from '../../shared/factories';
import { setCorrection, setSelections } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import { HighlightedState, selectHighlightedState } from './selectHighlightedState';

describe('selectHighlightedState', () => {
  let deps: Dependencies;
  let store: AppStore;

  beforeEach(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('selects given char index highlighted state as default', () => {
    store.dispatch(setSelections([[12, 15]]));

    const state = store.getState();

    const highlightedState = selectHighlightedState(state, 13);

    expect(highlightedState).toEqual(HighlightedState.default);
  });

  it('selects given char index highlighted state as success', () => {
    const correction = createCorrection();
    store.dispatch(setSelections([[12, 15]]));
    store.dispatch(setCorrection(correction));

    const state = store.getState();

    const highlightedState = selectHighlightedState(state, 13);

    expect(highlightedState).toEqual(HighlightedState.success);
  });

  it('selects given char index highlighted state as correction', () => {
    const correction = createCorrection();
    store.dispatch(setCorrection(correction));

    const state = store.getState();

    const highlightedState = selectHighlightedState(state, 13);

    expect(highlightedState).toEqual(HighlightedState.correction);
  });

  it('selects given char index highlighted state as error', () => {
    const correction = createCorrection();
    store.dispatch(setSelections([[1, 4]]));
    store.dispatch(setCorrection(correction));

    const state = store.getState();

    const highlightedState = selectHighlightedState(state, 1);

    expect(highlightedState).toEqual(HighlightedState.error);
  });

  it('selects given char index as not highlighted', () => {
    const correction = createCorrection();
    store.dispatch(setSelections([[1, 4]]));
    store.dispatch(setCorrection(correction));

    const state = store.getState();

    const highlightedState = selectHighlightedState(state, 10);

    expect(highlightedState).toEqual(undefined);
  });
});
