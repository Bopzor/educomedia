import { Correction } from '../../domain/entities/correction';
import { Misinformation } from '../../domain/entities/misinformation';
import MisinformationGateway from '../../domain/gateways/MisinformationGateway';
import { Range } from '../../domain/types';

class InMemoryMisinformationGateway implements MisinformationGateway {
  misinformations: Map<string, Misinformation> = new Map();
  corrections: Map<string, Correction> = new Map();

  async accessMisinformation(id: string): Promise<Misinformation> {
    return this.misinformations.get(id)!;
  }

  async validateSelections(selections: Range[]): Promise<void> {
    return;
  }

  async accessCorrection(id: string): Promise<Correction> {
    return this.corrections.get(id)!;
  }
}

export default InMemoryMisinformationGateway;
