import { Information } from '../../domain/entities/information';
import InformationGateway from '../../domain/gateways/InformationGateway';
import { Range } from '../../domain/types';

class InMemoryInformationGateway implements InformationGateway {
  informations: Map<string, Information> = new Map();

  constructor(initialInformations?: Information[]) {
    if (initialInformations) {
      for (const information of initialInformations) {
        this.informations.set(information.id, information);
      }
    }
  }

  async accessInformation(id: string): Promise<Information> {
    return this.informations.get(id)!;
  }

  async validateSelections(selections: Range[]): Promise<void> {
    return;
  }
}

export default InMemoryInformationGateway;
