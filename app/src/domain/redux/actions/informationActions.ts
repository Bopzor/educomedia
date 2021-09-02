import { Actions, createAction } from '.';
import { Information } from '../../entities/information';

export const setInformation = (information: Information) => createAction(Actions.setInformation, information);
