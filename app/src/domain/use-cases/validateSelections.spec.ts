import { expect } from 'earljs';

import { setMisinformation, setSelections } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import { createCorrection, createMisinformation } from '../shared/factories';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';

import validateSelections from './validateSelections';

describe('validateSelections', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('validates the selections', async () => {
    const misinformation = createMisinformation();
    misinformationGateway.corrections.set(misinformation.id, createCorrection());
    store.dispatch(setMisinformation(misinformation));
    store.dispatch(setSelections([[1, 7]]));

    // TODO: shouldn't this be test in a createStore-like test instead?
    let state = store.getState();
    expect(state.isSelectionsValidated).toEqual(false);
    expect(state.correction).toEqual(undefined);
    expect(state.score).toEqual(undefined);

    await store.dispatch(validateSelections());

    state = store.getState();
    expect(state.isSelectionsValidated).toEqual(true);
    expect(state.correction).not.toEqual(undefined);
    expect(state.score).toBeA(Number);
  });
});
