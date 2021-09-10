import { Correction } from '../entities/correction';
import { Misinformation } from '../entities/misinformation';
import { Range } from '../types';

interface MisinformationGateway {
  accessMisinformation: (id: string) => Promise<Misinformation>;
  validateSelections: (selections: Range[]) => Promise<void>;
  accessCorrection: (id: string) => Promise<Correction>;
}

export default MisinformationGateway;
