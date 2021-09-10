import { expect } from 'earljs';
import InMemoryMisinformationGateway from '../../test/gateways/InMemoryMisinformationGateway';
import { AppStore, createStore } from '../redux/store';
import { createCorrection, createMisinformation } from '../../test/factories';
import accessInformation from './accessMisinformation';
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
    misinformationGateway.misinformations.set(misinformation.id, misinformation);
    misinformationGateway.corrections.set(misinformation.id, correction);

    await store.dispatch(accessInformation(misinformation.id));

    await store.dispatch(accessCorrection());

    const state = store.getState();
    expect(state.correction!).toBeAnObjectWith({ misinformationId: misinformation.id });
  });
});
