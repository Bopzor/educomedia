import { Information } from '../domain/entities/information';

export const createInformation = (information?: Partial<Information>) => ({
  id: 'info-1',
  content: 'content info 1',
  ...information,
});
