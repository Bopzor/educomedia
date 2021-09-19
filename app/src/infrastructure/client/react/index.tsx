import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createStore } from 'src/domain/redux/store';
import { createCorrection, createInformation, createMisinformation } from 'src/domain/shared/factories';
import fixture from 'src/domain/shared/fixture.json';
import InMemoryInformationGateway from 'src/domain/shared/gateways/InMemoryInformationGateway';
import InMemoryMisinformationGateway from 'src/domain/shared/gateways/InMemoryMisinformationGateway';
import { Range } from 'src/domain/types';

import App from './App';

const misinformationGateway = new InMemoryMisinformationGateway();
const informationGateway = new InMemoryInformationGateway();

const misinformation = createMisinformation({ content: fixture.misinformation });
const information = createInformation({ content: fixture.information.content, title: fixture.information.title });
const correction = createCorrection({ corrections: fixture.corrections as { range: Range; text: string }[] });
misinformationGateway.misinformations.set(misinformation.id, misinformation);
misinformationGateway.corrections.set(misinformation.id, correction);
informationGateway.informations.set(information.id, information);

const store = createStore({ misinformationGateway, informationGateway });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
