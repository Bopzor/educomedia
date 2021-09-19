import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createStore } from 'src/domain/redux/store';
import { createCorrection, createMisinformation } from 'src/domain/shared/factories';
import fixture from 'src/domain/shared/fixture.json';
import InMemoryMisinformationGateway from 'src/domain/shared/gateways/InMemoryMisinformationGateway';
import { Range } from 'src/domain/types';

import App from './App';

const misinformationGateway = new InMemoryMisinformationGateway();

const misinformation = createMisinformation({ content: fixture.misinformation });
const correction = createCorrection({ corrections: fixture.corrections as { range: Range; text: string }[] });
misinformationGateway.misinformations.set(misinformation.id, misinformation);
misinformationGateway.corrections.set(misinformation.id, correction);

const store = createStore({ misinformationGateway });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
