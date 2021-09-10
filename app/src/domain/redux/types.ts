import { Action as ReduxAction } from 'redux';
import { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { Misinformation } from '../entities/misinformation';
import MisinformationGateway from '../gateways/MisinformationGateway';
import { Range } from '../types';
import {
  clearSelections,
  setMisinformation,
  setSelections,
  setSelectionsValidated,
} from './actions/misinformationActions';
import { AppStore } from './store';

export type AppState = {
  misinformation?: Misinformation;
  selections: Range[];
  isSelectionsValidated: boolean;
};

export type Dependencies = {
  misinformationGateway: MisinformationGateway;
};

export type GetState = AppStore['getState'];
export type Dispatch = AppStore['dispatch'];

export type Action = ReturnType<
  | typeof setMisinformation
  | typeof setSelections
  | typeof setSelectionsValidated
  | typeof clearSelections
>;

export type ThunkResult<R> = ThunkAction<R, AppState, Dependencies, ReduxAction>;
export type AppThunkMiddleware = ThunkMiddleware<AppState, Action, Dependencies>;
