import { expect } from 'earljs';

import { createDeps, createMisinformation } from '../../shared/factories';
import InMemoryMisinformationGateway from '../../shared/gateways/InMemoryMisinformationGateway';
import { setMisinformation } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import selectMisinformation from './selectMisinformation';

describe('selectMisinformation', () => {
  let store: AppStore;
  let misinformationGateway: InMemoryMisinformationGateway;
  let deps: Dependencies;

  before(() => {
    misinformationGateway = new InMemoryMisinformationGateway();
    deps = createDeps({ misinformationGateway });
    store = createStore(deps);
  });

  it('selects the misinformation', () => {
    let state = store.getState();

    expect(selectMisinformation(state)).toEqual(undefined);

    const misinformation = createMisinformation();
    store.dispatch(setMisinformation(misinformation));

    state = store.getState();

    expect(selectMisinformation(state)).toEqual(misinformation);
  });
});
