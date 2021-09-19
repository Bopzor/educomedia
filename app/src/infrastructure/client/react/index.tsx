import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createStore } from 'src/domain/redux/store';
import { createMisinformation } from 'src/domain/shared/factories';
import fixture from 'src/domain/shared/fixture.json';
import InMemoryMisinformationGateway from 'src/domain/shared/gateways/InMemoryMisinformationGateway';

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
