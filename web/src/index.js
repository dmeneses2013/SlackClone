import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App';
import './index.scss';

render(
<Provider store={store}>
  <App class="root" />
  </Provider>,
  document.getElementById("root")
);
