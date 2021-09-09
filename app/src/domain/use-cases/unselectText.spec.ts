import { expect } from 'earljs';
import InMemoryInformationGateway from '../../test/gateways/InMemoryInformationGateway';
import { AppStore, createStore } from '../redux/store';
import selectText from './selectText';
import unselectText from './unselectText';

describe('selectText', () => {
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ informationGateway });
  });

  it('unselects given text range', () => {
    store.dispatch(selectText(2, 8));
    store.dispatch(selectText(15, 24));

    store.dispatch(unselectText(2, 8));

    expectSelections([[15, 24]]);
  });

  it('unselects text from a selection', () => {
    store.dispatch(selectText(2, 8));

    store.dispatch(unselectText(4, 5));

    expectSelections([
      [2, 3],
      [6, 8],
    ]);
  });

  it('unselects text at the end of a selection', () => {
    store.dispatch(selectText(6, 8));

    store.dispatch(unselectText(8, 8));

    expectSelections([[6, 7]]);
  });

  it('unselects text at the start of a selection', () => {
    store.dispatch(selectText(2, 3));

    store.dispatch(unselectText(1, 2));

    expectSelections([[3, 3]]);
  });

  const expectSelections = (expected: [number, number][]) => {
    const state = store.getState();

    for (const range of expected) {
      expect(state.selections).toBeAnArrayWith(range);
    }

    expect(state.selections).toBeAnArrayOfLength(expected.length);
  };
});
