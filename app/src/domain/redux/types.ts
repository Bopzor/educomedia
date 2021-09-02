import { Information } from '../entities/information';
import InformationGateway from '../gateways/InformationGateway';
import { setInformation } from './actions/informationActions';
import { AppStore } from './store';

export type AppState = {
  information?: Information;
};

export type Dependencies = {
  informationGateway: InformationGateway;
};

export type GetState = AppStore['getState'];
export type Dispatch = AppStore['dispatch'];

export type Action = ReturnType<typeof setInformation>;
