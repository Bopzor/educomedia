import { expect } from 'earljs';
import InMemoryInformationGateway from '../../test/gateways/InMemoryInformationGateway';
import { clearSelections } from '../redux/actions/informationActions';
import { AppStore, createStore } from '../redux/store';
import selectText from './selectText';

describe('clearSelections', () => {
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ informationGateway });
  });

  it('clears the selections', () => {
    store.dispatch(selectText(2, 8));

    store.dispatch(clearSelections());

    const state = store.getState();
    expect(state.selections).toBeAnArrayOfLength(0);
  });
});
