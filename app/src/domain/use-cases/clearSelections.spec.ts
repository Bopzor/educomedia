import { expect } from 'earljs';

import { clearSelections, setSelections } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';

describe('clearSelections', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('clears the selections', () => {
    store.dispatch(setSelections([[2, 8]]));

    store.dispatch(clearSelections());

    const state = store.getState();
    expect(state.selections).toBeAnArrayOfLength(0);
  });
});
