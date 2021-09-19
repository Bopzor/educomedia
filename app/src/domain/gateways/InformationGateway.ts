interface InformationGateway {
  accessTitle: (id: string) => Promise<string>;
}

export default InformationGateway;
