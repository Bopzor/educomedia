import { expect } from 'earljs';
import InMemoryMisinformationGateway from '../../test/gateways/InMemoryMisinformationGateway';
import { setSelections } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import validateSelections from './validateSelections';

describe('validateSelections', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('validates the selections', async () => {
    store.dispatch(setSelections([[1, 7]]));

    let state = store.getState();
    expect(state.isSelectionsValidated).toEqual(false);

    await store.dispatch(validateSelections());

    state = store.getState();
    expect(state.isSelectionsValidated).toEqual(true);
  });
});
