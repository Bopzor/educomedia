import { expect } from 'earljs';

import { AppStore, createStore } from '../redux/store';
import { Dependencies } from '../redux/types';
import { createDeps } from '../shared/factories';

import { selectText } from './selectText';

describe('selectText', () => {
  let store: AppStore;
  let deps: Dependencies;

  beforeEach(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('selects given text range', () => {
    store.dispatch(selectText(2, 8));

    expectSelections([[2, 8]]);

    store.dispatch(selectText(32, 56));
    expectSelections([
      [2, 8],
      [32, 56],
    ]);
  });

  it('expands existing selection if the given text range overlap it', () => {
    store.dispatch(selectText(3, 8));

    store.dispatch(selectText(5, 10));

    expectSelections([[3, 10]]);

    store.dispatch(selectText(2, 3));

    expectSelections([[2, 10]]);

    store.dispatch(selectText(1, 12));

    expectSelections([[1, 12]]);
  });

  it('merges existing selections if the given text range overlap with others', () => {
    store.dispatch(selectText(3, 8));
    store.dispatch(selectText(10, 13));

    store.dispatch(selectText(7, 14));

    expectSelections([[3, 14]]);
  });

  const expectSelections = (expected: [number, number][]) => {
    const state = store.getState();

    for (const range of expected) {
      expect(state.selections).toBeAnArrayWith(range);
    }

    expect(state.selections).toBeAnArrayOfLength(expected.length);
  };
});
