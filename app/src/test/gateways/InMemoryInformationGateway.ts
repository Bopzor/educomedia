import { Information } from '../../domain/entities/information';
import InformationGateway from '../../domain/gateways/InformationGateway';

class InMemoryInformationGateway implements InformationGateway {
  private informations: Map<string, Information> = new Map();

  constructor() {
    this.informations.set('info-1', { id: 'info-1', content: 'content info 1' });
  }

  accessInformation(id: string) {
    return this.informations.get(id)!;
  }
}

export default InMemoryInformationGateway;
