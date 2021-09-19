import { expect } from 'earljs';

import { clearSelections, setSelections } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import { Dependencies } from '../redux/types';
import { createDeps } from '../shared/factories';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';

describe('clearSelections', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;
  let deps: Dependencies;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    deps = createDeps({ misinformationGateway });
    store = createStore(deps);
  });

  it('clears the selections', () => {
    store.dispatch(setSelections([[2, 8]]));

    store.dispatch(clearSelections());

    const state = store.getState();
    expect(state.selections).toBeAnArrayOfLength(0);
  });
});
