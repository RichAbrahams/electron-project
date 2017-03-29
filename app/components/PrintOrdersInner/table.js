import React from 'react';
import shortid from 'shortid';
import moment from 'moment';
import InvoiceTable from '../stc/InvoiceTable';

function formatDate(date) {
  const dt = Date.parse(date);
  const fd = moment(dt).format('DD/MM/YYYY');
  console.log(fd);
  return <td>{fd}</td>;
}

function Items(props) {
  const  {order } = props;
  return (
    <InvoiceTable className="new-orders-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Item Cost</th>
          <th>Delivery</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {order
          .items
          .map((item) => <tr key={shortid.generate()}>
            {formatDate(order.creationDate)}
            <td>{item.title}</td>
            <td>{item.quantity}</td>
            <td>{item.itemCost}</td>
            <td>{item.deliveryCost}</td>
            <td>{item.totalCost}</td>
          </tr>)}
      </tbody>
    </InvoiceTable>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default Items;
