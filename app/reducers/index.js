import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import homepage from '../containers/Homepage/reducer';
import navbar from '../containers/NavBar/reducer';
import addConsignment from '../containers/AddConsignment/reducer';
import orders from '../containers/Orders/reducer';
import products from '../containers/Products/reducer';
import settings from '../containers/Settings/reducer';
import salesdata from '../containers/SalesData/reducer';
import downloadOrders from '../containers/DownloadOrders/reducer';

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  homepage,
  navbar,
  orders,
  products,
  settings,
  salesdata,
  addConsignment,
  downloadOrders
});

export default rootReducer;
