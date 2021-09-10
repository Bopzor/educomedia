import { expect } from 'earljs';

import { createCorrection, createMisinformation } from '../../test/factories';
import fixture from '../../test/fixture.json';
import InMemoryMisinformationGateway from '../../test/gateways/InMemoryMisinformationGateway';
import { Correction } from '../entities/correction';
import { Misinformation } from '../entities/misinformation';
import {
  setCorrection,
  setMisinformation,
  setSelections,
  setSelectionsValidated,
} from '../redux/actions/misinformationActions';
import { AppStore, createStore } from '../redux/store';
import { Range } from '../types';

import calculateScore from './calculateScore';
const fixtureCorrections = fixture.corrections as { range: Range; text: string }[];

describe('calculateScore', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
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
      [37, 87],
      [800, 843],
      [2698, 2758],
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
