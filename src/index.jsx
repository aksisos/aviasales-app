import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

const container = document.getElementById('root');
const rot = createRoot(container);
rot.render(
  <Provider store={store}>
    <App />
  </Provider>
);

