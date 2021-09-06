import { createAction } from '.';
import { Information } from '../../entities/information';

export const setInformation = (information: Information) => createAction('set-information', information);
export const setSelections = (selections: [number, number][]) => createAction('set-selections', selections);
