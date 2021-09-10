import { Misinformation } from '../../domain/entities/misinformation';
import MisinformationGateway from '../../domain/gateways/MisinformationGateway';
import { Range } from '../../domain/types';

class InMemoryMisinformationGateway implements MisinformationGateway {
  misinformations: Map<string, Misinformation> = new Map();

  constructor(initialMisinformations?: Misinformation[]) {
    if (initialMisinformations) {
      for (const information of initialMisinformations) {
        this.misinformations.set(information.id, information);
      }
    }
  }

  async accessMisinformation(id: string): Promise<Misinformation> {
    return this.misinformations.get(id)!;
  }

  async validateSelections(selections: Range[]): Promise<void> {
    return;
  }
}

export default InMemoryMisinformationGateway;
