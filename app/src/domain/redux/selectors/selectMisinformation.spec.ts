import { expect } from 'earljs';

import { createMisinformation } from '../../shared/factories';
import InMemoryMisinformationGateway from '../../shared/gateways/InMemoryMisinformationGateway';
import { setMisinformation } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';

import selectMisinformation from './selectMisinformation';

describe('selectMisinformation', () => {
  let store: AppStore;
  let misinformationGateway: InMemoryMisinformationGateway;

  before(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('selects the misinformation', () => {
    let state = store.getState();

    expect(selectMisinformation(state)).toEqual(undefined);

    const misinformation = createMisinformation();
    store.dispatch(setMisinformation(misinformation));

    state = store.getState();

    expect(selectMisinformation(state)).toEqual(misinformation);
  });
});
