import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/Homepage/index';
import AddConsignment from './containers/AddConsignment/index';
import Orders from './containers/Orders/index';
import Products from './containers/Products/index';
import Settings from './containers/Settings/index';
import SalesData from './containers/SalesData/index';
import DownloadOrders from './containers/DownloadOrders/index';
import PrintOrders from './containers/PrintOrders/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="add-consignment" component={AddConsignment} />
    <Route path="download-orders" component={DownloadOrders} />
    <Route path="print-orders" component={PrintOrders} />
    <Route path="products" component={Products} />
    <Route path="salesdata" component={SalesData} />
    <Route path="settings" component={Settings} />
  </Route>
);
