import { Information } from 'src/domain/entities/information';
import InformationGateway from 'src/domain/gateways/InformationGateway';

class InMemoryInformationGateway implements InformationGateway {
  informations: Map<string, Information> = new Map();

  async accessTitle(id: string): Promise<string> {
    return this.informations.get(id)!.title;
  }
}

export default InMemoryInformationGateway;
