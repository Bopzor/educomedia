import { expect } from 'earljs';
import { createInformation } from '../../test/gateways/factories';
import InMemoryInformationGateway from '../../test/gateways/InMemoryInformationGateway';
import { AppStore, createStore } from '../redux/store';
import accessInformation from './accessInformation';
import selectText from './selectText';

describe('selectText', () => {
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ informationGateway });
  });

  it('selects given text range', async () => {
    const information = createInformation();
    informationGateway.informations.set(information.id, information);
    await store.dispatch(accessInformation(information.id));

    store.dispatch(selectText(2, 8));

    const state = store.getState();

    expect(state.selections).toBeAnArrayOfLength(1);
    expect(state.selections[0]).toEqual([2, 8]);
  });
});
