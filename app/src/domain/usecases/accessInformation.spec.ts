import { expect } from 'earljs';
import InMemoryInformationGateway from '../../test/gateways/InMemoryInformationGateway';
import { Information } from '../entities/information';
import InformationGateway from '../gateways/InformationGateway';
import { AppStore, createStore } from '../redux/store';

import accessInformation from './accessInformation';

describe('accessInformation', () => {
  let informationGateway: InformationGateway;
  let store: AppStore;

  beforeEach(() => {
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ informationGateway });
  });

  it('accesses the information from the id', async () => {
    const information = createInformation();

    await store.dispatch(accessInformation(information.id));

    const state = store.getState();

    expect(state.information).toEqual({
      id: 'info-1',
      content: 'content info 1',
    });
  });
});

const createInformation = (information?: Partial<Information>) => ({
  id: 'info-1',
  content: 'content info 1',
  ...information,
});
