import { Correction } from '../../domain/entities/correction';
import { Misinformation } from '../../domain/entities/misinformation';
import MisinformationGateway from '../../domain/gateways/MisinformationGateway';

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
