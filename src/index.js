import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';

import burgerReducer from './store/reducers/burger-reducer';
import orderReducer from './store/reducers/order-reducer';
import authReducer from './store/reducers/auth-reducer';

const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer,
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
