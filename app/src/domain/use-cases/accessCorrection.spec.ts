import { expect } from 'earljs';

import { setMisinformation } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import { createCorrection, createDeps, createMisinformation } from '../shared/factories';
import InMemoryInformationGateway from '../shared/gateways/InMemoryInformationGateway';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';

import { accessCorrection } from './accessCorrection';

describe('accessCorrection', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    ({ misinformationGateway, informationGateway } = createDeps());
    store = createStore({ misinformationGateway, informationGateway });
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
