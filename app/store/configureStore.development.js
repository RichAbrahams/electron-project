import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import * as homepageActions from '../containers/Homepage/actions';
import * as navBarActions from '../containers/NavBar/actions';
import * as ordersActions from '../containers/Orders/actions';

import NavBarSaga from '../containers/NavBar/sagas';
import OrdersSaga from '../containers/Orders/sagas';

const actionCreators = {
  ...navBarActions,
  ...homepageActions,
  ...ordersActions,
  push,
};

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger, sagaMiddleware)
);


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  sagaMiddleware.run(NavBarSaga);
  sagaMiddleware.run(OrdersSaga);

  return store;
}
