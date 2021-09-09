import { createAction } from '.';
import { Information } from '../../entities/information';
import { Range } from '../../types';

export const setInformation = (information: Information) => createAction('set-information', information);
export const setSelections = (selections: Range[]) => createAction('set-selections', selections);
export const setSelectionsValidated = (isValidated: boolean) => createAction('set-selections-validated', isValidated);
export const clearSelections = () => createAction('clear-selections');
