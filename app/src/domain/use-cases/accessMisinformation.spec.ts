import { expect } from 'earljs';

import { AppStore, createStore } from '../redux/store';
import { createMisinformation } from '../shared/factories';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';

import accessInformation from './accessMisinformation';

describe('accessMisinformation', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('accesses the information from the id', async () => {
    const information = createMisinformation();
    misinformationGateway.misinformations.set(information.id, information);

    await store.dispatch(accessInformation(information.id));

    const state = store.getState();

    expect(state.misinformation).toEqual({
      id: 'misinfo-1',
      informationId: 'info-1',
      content: 'content info 2',
    });
  });
});
