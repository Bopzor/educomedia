import { expect } from 'earljs';

import { AppStore, createStore } from '../redux/store';
import { createInformation, createMisinformation } from '../shared/factories';
import InMemoryInformationGateway from '../shared/gateways/InMemoryInformationGateway';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';

import { accessInformationTitle } from './accessInformationTitle';
import { accessMisinformation } from './accessMisinformation';

describe('accessInformationTitle', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ misinformationGateway, informationGateway });
  });

  it('accesses the information title', async () => {
    const misinformation = createMisinformation();
    const information = createInformation();
    misinformationGateway.misinformations.set(misinformation.id, misinformation);
    informationGateway.informations.set(misinformation.informationId, information);
    // TODO: Should I be able to setup the store without having to dispatch this action?
    await store.dispatch(accessMisinformation(misinformation.id));

    await store.dispatch(accessInformationTitle());

    const state = store.getState();

    expect(state.informationTitle).toEqual('title 1');
  });
});
