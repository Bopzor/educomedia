import { Range } from '../types';

export type Correction = {
  id: string;
  misinformationId: string;
  corrections: Solution[];
};

export type Solution = {
  range: Range;
  text: string;
};
