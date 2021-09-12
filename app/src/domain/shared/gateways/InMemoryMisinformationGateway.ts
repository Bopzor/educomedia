import { Correction } from '../../entities/correction';
import { Misinformation } from '../../entities/misinformation';
import MisinformationGateway from '../../gateways/MisinformationGateway';

class InMemoryMisinformationGateway implements MisinformationGateway {
  misinformations: Map<string, Misinformation> = new Map();
  corrections: Map<string, Correction> = new Map();

  async accessMisinformation(id: string): Promise<Misinformation> {
    return this.misinformations.get(id)!;
  }

  async accessCorrection(id: string): Promise<Correction> {
    return this.corrections.get(id)!;
  }
}

export default InMemoryMisinformationGateway;
