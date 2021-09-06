import { Information } from '../../domain/entities/information';
import InformationGateway from '../../domain/gateways/InformationGateway';

class InMemoryInformationGateway implements InformationGateway {
  informations: Map<string, Information> = new Map();
  selections: [number, number][] = [];

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

  async selectText(id: string, start: number, end: number): Promise<[number, number][]> {
    this.selections.push([start, end]);

    return this.selections;
  }
}

export default InMemoryInformationGateway;
