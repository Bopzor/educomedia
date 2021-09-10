import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import misinformationReducer from './reducers/misinformationReducer';
import type { AppThunkMiddleware, Dependencies } from './types';

export const createStore = (dependencies: Dependencies) =>
  reduxCreateStore(
    misinformationReducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(dependencies) as AppThunkMiddleware)),
  );

export type AppStore = ReturnType<typeof createStore>;
