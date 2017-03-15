import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import NavBarSaga from '../containers/NavBar/sagas';

const router = routerMiddleware(hashHistory);

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(thunk, router, sagaMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer); // eslint-disable-line
  sagaMiddleware.run(NavBarSaga);
  return store;
}
