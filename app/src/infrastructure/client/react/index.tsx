import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createStore } from '../../../domain/redux/store';
import { createMisinformation } from '../../../domain/shared/factories';
import fixture from '../../../domain/shared/fixture.json';
import InMemoryMisinformationGateway from '../../../domain/shared/gateways/InMemoryMisinformationGateway';

import App from './App';

const misinformationGateway = new InMemoryMisinformationGateway();
const misinformation = createMisinformation({ content: fixture.misinformation });
misinformationGateway.misinformations.set(misinformation.id, misinformation);
const store = createStore({ misinformationGateway });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
