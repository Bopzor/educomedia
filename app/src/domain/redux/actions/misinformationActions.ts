import { createAction } from '.';
import { Misinformation } from '../../entities/misinformation';
import { Range } from '../../types';

export const setMisinformation = (misinformation: Misinformation) => createAction('set-misinformation', misinformation);

export const setSelections = (selections: Range[]) => createAction('set-selections', selections);

export const setSelectionsValidated = (isValidated: boolean) => createAction('set-selections-validated', isValidated);

export const clearSelections = () => createAction('clear-selections');