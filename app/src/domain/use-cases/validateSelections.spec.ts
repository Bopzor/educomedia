import { expect } from 'earljs';
import InMemoryMisinformationGateway from '../../test/gateways/InMemoryMisinformationGateway';
import { AppStore, createStore } from '../redux/store';
import selectText from './selectText';
import validateSelections from './validateSelections';

describe('validateSelections', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
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
