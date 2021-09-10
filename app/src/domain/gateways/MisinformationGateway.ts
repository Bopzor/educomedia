import { Correction } from '../entities/correction';
import { Misinformation } from '../entities/misinformation';

interface MisinformationGateway {
  accessMisinformation: (id: string) => Promise<Misinformation>;
  accessCorrection: (id: string) => Promise<Correction>;
}

export default MisinformationGateway;
