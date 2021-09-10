import { Misinformation } from '../domain/entities/misinformation';

export const createMisinformation = (misinformation?: Partial<Misinformation>): Misinformation => ({
  id: 'misinfo-1',
  informationId: 'info-1',
  content: 'content info 2',
  ...misinformation,
});
