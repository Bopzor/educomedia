import { expect } from 'earljs';

import { AppStore, createStore } from '../domain/redux/store';
import { createCorrection, createMisinformation } from './factories';
import InMemoryMisinformationGateway from './gateways/InMemoryMisinformationGateway';

import fixture from './fixture.json';
import { Range } from '../domain/types';
import accessMisinformation from '../domain/use-cases/accessMisinformation';
import selectText from '../domain/use-cases/selectText';
import validateSelections from '../domain/use-cases/validateSelections';
import unselectText from '../domain/use-cases/unselectText';

describe('e2e', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    store = createStore({ misinformationGateway });
  });

  it('runs a content', async () => {
    const misinformation = createMisinformation({ content: fixture.misinformation });
    const correction = createCorrection({ corrections: fixture.corrections as { range: Range; text: string }[] });
    misinformationGateway.misinformations.set(misinformation.id, misinformation);
    misinformationGateway.corrections.set(misinformation.id, correction);

    await store.dispatch(accessMisinformation(misinformation.id));

    store.dispatch(selectText(27, 87));

    store.dispatch(unselectText(27, 36));

    store.dispatch(selectText(800, 833));
    store.dispatch(selectText(2698, 2758));

    await store.dispatch(validateSelections());

    const state = store.getState();

    expect(state.misinformation!).toBeAnObjectWith({ id: misinformation.id });
    expect(state.selections).toBeAnArrayWith([37, 87], [800, 833], [2698, 2758]);
    expect(state.correction!).toBeAnObjectWith({ misinformationId: misinformation.id });
    expect(state.score).toEqual(100);
  });
});
