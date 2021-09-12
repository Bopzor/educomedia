import { expect } from 'earljs';

import InMemoryMisinformationGateway from '../../shared/gateways/InMemoryMisinformationGateway';
import { setSelections } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';

import selectSelections from './selectSelections';

describe('selectSelections', () => {
  let store: AppStore;
  let misinformationGateway: InMemoryMisinformationGateway;

  before(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('selects the selections', () => {
    let state = store.getState();

    expect(selectSelections(state)).toEqual([]);

    store.dispatch(setSelections([[0, 3]]));

    state = store.getState();

    expect(selectSelections(state)).toBeAnArrayWith([0, 3]);
  });
});
