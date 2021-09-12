import { expect } from 'earljs';

import InMemoryMisinformationGateway from '../../shared/gateways/InMemoryMisinformationGateway';
import { setScore } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';

import selectScore from './selectScore';

describe('selectScore', () => {
  let store: AppStore;
  let misinformationGateway: InMemoryMisinformationGateway;

  before(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('selects the score', () => {
    let state = store.getState();

    expect(selectScore(state)).toEqual(undefined);

    store.dispatch(setScore(100));

    state = store.getState();

    expect(selectScore(state)).toEqual(100);
  });
});
