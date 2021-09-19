import { expect } from 'earljs';

import { createCorrection, createDeps } from '../../shared/factories';
import InMemoryMisinformationGateway from '../../shared/gateways/InMemoryMisinformationGateway';
import { setCorrection } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import selectCorrection from './selectCorrection';

describe('selectCorrection', () => {
  let store: AppStore;
  let misinformationGateway: InMemoryMisinformationGateway;
  let deps: Dependencies;

  before(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    deps = createDeps({ misinformationGateway });
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
