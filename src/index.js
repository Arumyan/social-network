import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer';
import { HashRouter } from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.store = store;

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {/* <HashRouter>
      <App />
    </HashRouter> */}
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
