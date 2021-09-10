import { Correction } from '../domain/entities/correction';
import { Misinformation } from '../domain/entities/misinformation';

export const createMisinformation = (misinformation?: Partial<Misinformation>): Misinformation => ({
  id: 'misinfo-1',
  informationId: 'info-1',
  content: 'content info 2',
  ...misinformation,
});

export const createCorrection = (correction?: Partial<Correction>): Correction => ({
  id: 'correction-1',
  misinformationId: 'misinfo-1',
  corrections: [{ range: [13, 13], text: '1' }],
  ...correction,
});
