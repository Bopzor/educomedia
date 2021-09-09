import { Information } from '../entities/information';
import { Range } from '../types';

interface InformationGateway {
  accessInformation: (id: string) => Promise<Information>;
  validateSelections: (selections: Range[]) => Promise<void>;
}

export default InformationGateway;
