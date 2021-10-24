import { expect } from 'earljs';

import { setMisinformation } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import { createDeps, createInformation, createMisinformation } from '../shared/factories';
import InMemoryInformationGateway from '../shared/gateways/InMemoryInformationGateway';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';

import { accessInformationTitle } from './accessInformationTitle';

describe('accessInformationTitle', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    ({ misinformationGateway, informationGateway } = createDeps());
    store = createStore({ misinformationGateway, informationGateway });
  });

  it('accesses the information title', async () => {
    const misinformation = createMisinformation();
    const information = createInformation();
    misinformationGateway.misinformations.set(misinformation.id, misinformation);
    informationGateway.informations.set(misinformation.informationId, information);
    store.dispatch(setMisinformation(misinformation));

    await store.dispatch(accessInformationTitle());

    const state = store.getState();

    expect(state.informationTitle).toEqual('title 1');
  });
});
