import { Misinformation } from '../entities/misinformation';
import { Range } from '../types';

interface MisinformationGateway {
  accessMisinformation: (id: string) => Promise<Misinformation>;
  validateSelections: (selections: Range[]) => Promise<void>;
}

export default MisinformationGateway;
