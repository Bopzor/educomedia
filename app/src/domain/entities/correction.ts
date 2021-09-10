import { Range } from '../types';

export type Correction = {
  id: string;
  misinformationId: string;
  corrections: { range: Range; text: string }[];
};
