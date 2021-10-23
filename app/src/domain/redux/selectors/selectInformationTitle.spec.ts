import { expect } from 'earljs';

import { createDeps, createInformation } from '../../shared/factories';
import { setInformationTitle } from '../actions/misinformationActions';
import { AppStore, createStore } from '../store';
import { Dependencies } from '../types';

import selectInformationTitle from './selectInformationTitle';

describe('selectInformationTitle', () => {
  let deps: Dependencies;
  let store: AppStore;

  before(() => {
    deps = createDeps();
    store = createStore(deps);
  });

  it('selects the score', () => {
    const information = createInformation();
    store.dispatch(setInformationTitle(information.title));

    const state = store.getState();

    expect(selectInformationTitle(state)).toEqual(information.title);
  });
});
