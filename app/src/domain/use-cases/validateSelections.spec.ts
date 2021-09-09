import { expect } from 'earljs';
import InMemoryInformationGateway from '../../test/gateways/InMemoryInformationGateway';
import { AppStore, createStore } from '../redux/store';
import selectText from './selectText';
import validateSelections from './validateSelections';

describe('validateSelections', () => {
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ informationGateway });
  });

  it('validates the selections', async () => {
    store.dispatch(selectText(1, 7));

    let state = store.getState();
    expect(state.isSelectionsValidated).toEqual(false);

    await store.dispatch(validateSelections());

    state = store.getState();
    expect(state.isSelectionsValidated).toEqual(true);
  });
});
