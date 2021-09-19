import { expect } from 'earljs';

import { createInformation } from '../../shared/factories';
import InMemoryInformationGateway from '../../shared/gateways/InMemoryInformationGateway';
import InMemoryMisinformationGateway from '../../shared/gateways/InMemoryMisinformationGateway';
import { setInformationTitle } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';

import selectInformationTitle from './selectInformationTitle';

describe('selectInformationTitle', () => {
  let store: AppStore;
  let misinformationGateway: InMemoryMisinformationGateway;
  let informationGateway: InMemoryInformationGateway;

  before(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    informationGateway = new InMemoryInformationGateway();
    store = createStore({ misinformationGateway, informationGateway });
  });

  it('selects the score', () => {
    const information = createInformation();
    store.dispatch(setInformationTitle(information.title));

    const state = store.getState();

    expect(selectInformationTitle(state)).toEqual(information.title);
  });
});
