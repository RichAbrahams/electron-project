import math from 'mathjs';
import calculateFulfillmentCost from './calculateFulfillmentCost';
import calculateProfit from './calculateProfit';
import saveMany from '../mongoOperations/saveMany';
import calculateProfitPerLine from './calculateProfitPerLine';
import retrieveCharges from '../mongoOperations/retrieveCharges';
import updateProductStockProfit from '../mongoOperations/updateProductStockProfit';
import replyToRenderer from '../replyToRenderer';

function flattenOrders(orders) {
  return orders
    .map(order => order.items)
    .reduce((acc, cur) => acc.concat(cur), []);
}

function createIDsContainer(orders) {
  return orders
    .map(item => item.sku)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map(id => ({productID: id, quantity: 0, profit: 0}))
    .map(product => {
      orders.forEach(order => {
        if (product.productID === order.sku) {
          product.quantity = math
            .chain(product.quantity)
            .add(order.quantity)
            .done();
          product.profit = math
            .chain(product.profit)
            .add(order.profit)
            .done();
        }
      });
      return product;
    });
}

function updateStockLevelandProfit(db, orders) {
  try {
    const flatOrders = flattenOrders(orders);
    const idsContainer = createIDsContainer(flatOrders);
    idsContainer.forEach(item => updateProductStockProfit(db, item));
  } catch (err) {
    throw(err);
  }
}

function recalculateOrders(orders, charges) {
  const recalculatedOrders = orders.map((item) => {
    const newFulfillment = calculateFulfillmentCost(item.ebayFee, item.paypalFee, item.totalLandedItemsCost, item.postage, item.packaging);
    const newProfit = calculateProfit(item.total, newFulfillment);
    const addLinesProfit = calculateProfitPerLine(item.items, item.postage, newProfit, charges[0]);
    return Object.assign({}, item, {
      fulfillmentCost: newFulfillment,
      profit: newProfit,
      items: addLinesProfit
    });
  });
  return recalculatedOrders;
}

export default async function processEditedNewOrders(db, event, action) {
  try {
    const charges = await retrieveCharges(db);
    console.log('retrieveCharges done');
    const recalculatedOrders = recalculateOrders(action.payload, charges);
    console.log('recalculateOrders done');
    await updateStockLevelandProfit(db, recalculatedOrders);
    console.log('updateStockLevelandProfit done');
    saveMany(db, event, {
      type: action.type,
      payload: {
        collection: 'orders',
        values: recalculatedOrders,
        from: action.type
      }
    });
  } catch (err) {
    console.log('processEditedNewOrders error', err);
    replyToRenderer(event, {
      type: `${action.type}_ERROR`,
      payload: err
    });
  }
}
