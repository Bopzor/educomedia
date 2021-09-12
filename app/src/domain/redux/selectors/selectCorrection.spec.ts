import { expect } from 'earljs';

import { createCorrection } from '../../shared/factories';
import InMemoryMisinformationGateway from '../../shared/gateways/InMemoryMisinformationGateway';
import { setCorrection } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';

import selectCorrection from './selectCorrection';

describe('selectCorrection', () => {
  let store: AppStore;
  let misinformationGateway: InMemoryMisinformationGateway;

  before(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
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
