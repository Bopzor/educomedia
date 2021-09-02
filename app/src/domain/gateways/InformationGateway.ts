import { Information } from '../entities/information';

interface InformationGateway {
  accessInformation: (id: string) => Information;
}

export default InformationGateway;
