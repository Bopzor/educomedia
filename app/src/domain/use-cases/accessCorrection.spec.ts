import { expect } from 'earljs';
import InMemoryMisinformationGateway from '../../test/gateways/InMemoryMisinformationGateway';
import { AppStore, createStore } from '../redux/store';
import { createCorrection, createMisinformation } from '../../test/factories';
import accessCorrection from './accessCorrection';
import { setMisinformation } from '../redux/actions/misinformationActions';

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
