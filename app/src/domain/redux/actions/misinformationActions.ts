import { Correction } from '../../entities/correction';
import { Misinformation } from '../../entities/misinformation';
import { Range } from '../../types';

import { createAction } from '.';

export const setMisinformation = (misinformation: Misinformation) => createAction('set-misinformation', misinformation);

export const setSelections = (selections: Range[]) => createAction('set-selections', selections);

export const setSelectionsValidated = (isValidated: boolean) => createAction('set-selections-validated', isValidated);

export const clearSelections = () => createAction('clear-selections');

export const setCorrection = (correction: Correction) => createAction('set-correction', correction);

export const setScore = (score: number) => createAction('set-score', score);
