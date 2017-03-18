import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import OrdersSaga from '../containers/Orders/sagas';
import ipcRendererChannelSaga from '../channelControllers/ipcRendererChannelSaga';
import getLocalStorage from '../middleware/getLocalStorage';
import setLocalStorage from '../middleware/setLocalStorage';

const router = routerMiddleware(hashHistory);

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(thunk, router, sagaMiddleware, getLocalStorage, setLocalStorage);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer); // eslint-disable-line
  sagaMiddleware.run(ipcRendererChannelSaga);
  sagaMiddleware.run(OrdersSaga);

  return store;
}
