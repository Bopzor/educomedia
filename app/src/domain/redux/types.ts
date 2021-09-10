import { Action as ReduxAction } from 'redux';
import { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { Correction } from '../entities/correction';
import { Misinformation } from '../entities/misinformation';
import MisinformationGateway from '../gateways/MisinformationGateway';
import { Range } from '../types';
import {
  clearSelections,
  setCorrection,
  setMisinformation,
  setScore,
  setSelections,
  setSelectionsValidated,
} from './actions/misinformationActions';
import { AppStore } from './store';

export type AppState = {
  misinformation?: Misinformation;
  selections: Range[];
  isSelectionsValidated: boolean;
  correction?: Correction;
  score?: number;
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
  | typeof setCorrection
  | typeof setScore
>;

export type ThunkResult<R> = ThunkAction<R, AppState, Dependencies, ReduxAction>;
export type AppThunkMiddleware = ThunkMiddleware<AppState, Action, Dependencies>;
