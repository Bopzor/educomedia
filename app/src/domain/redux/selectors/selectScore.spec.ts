import { expect } from 'earljs';

import { createDeps } from '../../shared/factories';
import InMemoryMisinformationGateway from '../../shared/gateways/InMemoryMisinformationGateway';
import { setScore } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import selectScore from './selectScore';

describe('selectScore', () => {
  let store: AppStore;
  let misinformationGateway: InMemoryMisinformationGateway;
  let deps: Dependencies;

  before(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    deps = createDeps({ misinformationGateway });
    store = createStore(deps);
  });

  it('selects the score', () => {
    let state = store.getState();

    expect(selectScore(state)).toEqual(undefined);

    store.dispatch(setScore(100));

    state = store.getState();

    expect(selectScore(state)).toEqual(100);
  });
});
