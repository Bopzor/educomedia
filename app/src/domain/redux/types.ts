import { Action as ReduxAction } from 'redux';
import { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { Information } from '../entities/information';
import InformationGateway from '../gateways/InformationGateway';
import { Range } from '../types';
import { setInformation, setSelections, setSelectionsValidated } from './actions/informationActions';
import { AppStore } from './store';

export type AppState = {
  information?: Information;
  selections: Range[];
  isSelectionsValidated: boolean;
};

export type Dependencies = {
  informationGateway: InformationGateway;
};

export type GetState = AppStore['getState'];
export type Dispatch = AppStore['dispatch'];

export type Action = ReturnType<typeof setInformation | typeof setSelections | typeof setSelectionsValidated>;

export type ThunkResult<R> = ThunkAction<R, AppState, Dependencies, ReduxAction>;
export type AppThunkMiddleware = ThunkMiddleware<AppState, Action, Dependencies>;
