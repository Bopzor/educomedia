import { expect } from 'earljs';
import { createInformation } from '../../test/gateways/factories';
import InMemoryInformationGateway from '../../test/gateways/InMemoryInformationGateway';
import { AppStore, createStore } from '../redux/store';

import accessInformation from './accessInformation';

describe('accessInformation', () => {
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ informationGateway });
  });

  it('accesses the information from the id', async () => {
    const information = createInformation();
    informationGateway.informations.set(information.id, information);

    await store.dispatch(accessInformation(information.id));

    const state = store.getState();

    expect(state.information).toEqual({
      id: 'info-1',
      content: 'content info 1',
    });
  });
});
