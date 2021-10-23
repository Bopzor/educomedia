import { Correction } from '../entities/correction';
import { Information } from '../entities/information';
import { Misinformation } from '../entities/misinformation';
import { Dependencies } from '../redux/types';

import InMemoryInformationGateway from './gateways/InMemoryInformationGateway';
import InMemoryMisinformationGateway from './gateways/InMemoryMisinformationGateway';

export const createInformation = (information?: Partial<Information>): Information => ({
  id: 'info-1',
  content: 'content info 1',
  title: 'title 1',
  url: 'http://info1.url',
  ...information,
});

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

interface InMemoryDependencies extends Dependencies {
  misinformationGateway: InMemoryMisinformationGateway;
  informationGateway: InMemoryInformationGateway;
}

export const createDeps = (deps?: Partial<InMemoryDependencies>): InMemoryDependencies => ({
  misinformationGateway: new InMemoryMisinformationGateway(),
  informationGateway: new InMemoryInformationGateway(),
  ...deps,
});
