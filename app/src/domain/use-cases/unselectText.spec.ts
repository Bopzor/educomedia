import { expect } from 'earljs';
import InMemoryMisinformationGateway from '../../test/gateways/InMemoryMisinformationGateway';
import { setSelections } from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import unselectText from './unselectText';

describe('selectText', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('unselects given text range', () => {
    store.dispatch(
      setSelections([
        [2, 8],
        [15, 24],
      ]),
    );

    store.dispatch(unselectText(2, 8));

    expectSelections([[15, 24]]);
  });

  it('unselects text from a selection', () => {
    store.dispatch(setSelections([[2, 8]]));

    store.dispatch(unselectText(4, 5));

    expectSelections([
      [2, 3],
      [6, 8],
    ]);
  });

  it('unselects text at the end of a selection', () => {
    store.dispatch(setSelections([[6, 8]]));

    store.dispatch(unselectText(8, 8));

    expectSelections([[6, 7]]);
  });

  it('unselects text at the start of a selection', () => {
    store.dispatch(setSelections([[2, 3]]));

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
