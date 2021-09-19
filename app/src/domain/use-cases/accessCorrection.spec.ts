import { expect } from 'earljs';

import { setMisinformation } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import { Dependencies } from '../redux/types';
import { createCorrection, createDeps, createMisinformation } from '../shared/factories';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';

import accessCorrection from './accessCorrection';

describe('accessCorrection', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let deps: Dependencies;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    deps = createDeps({ misinformationGateway });
    store = createStore(deps);
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
