import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './core/store/store';
import { App } from './features/components/app/App';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App></App>
      </Provider>
    </Router>
  </React.StrictMode>,
);
