import { expect } from 'earljs';

import { Correction } from '../entities/correction';
import { Misinformation } from '../entities/misinformation';
import {
  setCorrection,
  setMisinformation,
  setSelections,
  setSelectionsValidated,
} from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import { Dependencies } from '../redux/types';
import { createCorrection, createDeps, createMisinformation } from '../shared/factories';
import fixture from '../shared/fixture-test.json';
import InMemoryMisinformationGateway from '../shared/gateways/InMemoryMisinformationGateway';
import { Range } from '../types';

import calculateScore from './calculateScore';
const fixtureCorrections = fixture.corrections as { range: Range; text: string }[];

describe('calculateScore', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;
  let deps: Dependencies;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    deps = createDeps({ misinformationGateway });
    store = createStore(deps);
  });

  it('calculates the score', async () => {
    const misinformation = createMisinformation();
    const correction = createCorrection();
    await setupStore(misinformation, correction, [[13, 13]]);

    store.dispatch(calculateScore());

    const state = store.getState();
    expect(state.score).toEqual(100);
  });

  it('calculates a complex score', async () => {
    const misinformation = createMisinformation({ content: fixture.misinformation });
    const correction = createCorrection({ corrections: fixtureCorrections });
    await setupStore(misinformation, correction, [
      [37, 86],
      [797, 839],
      [2698, 2757],
    ]);

    store.dispatch(calculateScore());

    const state = store.getState();
    expect(state.score).toEqual(93);
  });

  it("returns a score equal to 0 if it's negative", async () => {
    const misinformation = createMisinformation({ content: fixture.misinformation });
    const correction = createCorrection({ corrections: fixtureCorrections });
    await setupStore(misinformation, correction, [[4, 10]]);

    store.dispatch(calculateScore());

    const state = store.getState();
    expect(state.score).toEqual(0);
  });

  const setupStore = (misinformation: Misinformation, correction: Correction, textSelections: Range[]) => {
    store.dispatch(setMisinformation(misinformation));

    store.dispatch(setSelections(textSelections));

    store.dispatch(setSelectionsValidated(true));

    store.dispatch(setCorrection(correction));
  };
});
