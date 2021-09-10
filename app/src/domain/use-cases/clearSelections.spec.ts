import { expect } from 'earljs';
import InMemoryMisinformationGateway from '../../test/gateways/InMemoryMisinformationGateway';
import { clearSelections } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import selectText from './selectText';

describe('clearSelections', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('clears the selections', () => {
    store.dispatch(selectText(2, 8));

    store.dispatch(clearSelections());

    const state = store.getState();
    expect(state.selections).toBeAnArrayOfLength(0);
  });
});
