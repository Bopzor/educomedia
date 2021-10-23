import { expect } from 'earljs';

import { AppStore, createStore } from '../redux/store';
import { Range } from '../types';
import { accessMisinformation } from '../use-cases/accessMisinformation';
import { selectText } from '../use-cases/selectText';
import { unselectText } from '../use-cases/unselectText';
import { validateSelections } from '../use-cases/validateSelections';

import { createCorrection, createInformation, createMisinformation } from './factories';
import fixture from './fixture-test.json';
import InMemoryInformationGateway from './gateways/InMemoryInformationGateway';
import InMemoryMisinformationGateway from './gateways/InMemoryMisinformationGateway';

describe('e2e', () => {
  let misinformationGateway: InMemoryMisinformationGateway;
  let informationGateway: InMemoryInformationGateway;
  let store: AppStore;

  beforeEach(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ misinformationGateway, informationGateway });
  });

  it('runs a content', async () => {
    const misinformation = createMisinformation({ content: fixture.misinformation });
    const information = createInformation(fixture.information);
    const correction = createCorrection({ corrections: fixture.corrections as { range: Range; text: string }[] });
    misinformationGateway.misinformations.set(misinformation.id, misinformation);
    misinformationGateway.corrections.set(misinformation.id, correction);
    informationGateway.informations.set(information.id, information);

    await store.dispatch(accessMisinformation(misinformation.id));

    store.dispatch(selectText(27, 86));

    store.dispatch(unselectText(27, 36));

    store.dispatch(selectText(797, 829));
    store.dispatch(selectText(2698, 2757));

    await store.dispatch(validateSelections());

    const state = store.getState();

    expect(state.misinformation!).toBeAnObjectWith({ id: misinformation.id });
    expect(state.informationTitle!).toEqual(information.title);
    expect(state.selections).toBeAnArrayWith([37, 86], [797, 829], [2698, 2757]);
    expect(state.correction!).toBeAnObjectWith({ misinformationId: misinformation.id });
    expect(state.score).toEqual(100);
  });
});
