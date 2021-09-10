import { expect } from 'earljs';

import { createCorrection, createMisinformation } from '../../test/factories';
import InMemoryMisinformationGateway from '../../test/gateways/InMemoryMisinformationGateway';
import { setMisinformation } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';

import accessCorrection from './accessCorrection';

describe('accessCorrection', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('accesses the correction of given information', async () => {
    const misinformation = createMisinformation();
    const correction = createCorrection();
    misinformationGateway.corrections.set(misinformation.id, correction);

    store.dispatch(setMisinformation(misinformation));

    await store.dispatch(accessCorrection());

    const state = store.getState();
    expect(state.correction!).toBeAnObjectWith({ misinformationId: misinformation.id });
  });
});
