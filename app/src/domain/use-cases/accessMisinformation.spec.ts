import { expect } from 'earljs';

import { AppStore, createStore } from '../redux/store';
import { createInformation, createMisinformation } from '../shared/factories';
import InMemoryInformationGateway from '../shared/gateways/InMemoryInformationGateway';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';

import { accessMisinformation } from './accessMisinformation';

describe('accessMisinformation', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ misinformationGateway, informationGateway });
  });

  it('accesses the misinformation from the id', async () => {
    const misinformation = createMisinformation();
    const information = createInformation();
    misinformationGateway.misinformations.set(misinformation.id, misinformation);
    informationGateway.informations.set(information.id, information);

    await store.dispatch(accessMisinformation(misinformation.id));

    const state = store.getState();

    expect(state.misinformation).toEqual({
      id: 'misinfo-1',
      informationId: 'info-1',
      content: 'content info 2',
    });
    expect(state.informationTitle).toEqual('title 1');
  });
});
