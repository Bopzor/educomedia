import { Information } from '../entities/information';

interface InformationGateway {
  accessInformation: (id: string) => Promise<Information>;
  selectText: (id: string, start: number, end: number) => Promise<[number, number][]>;
}

export default InformationGateway;
