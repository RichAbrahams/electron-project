import React from 'react';
import shortid from 'shortid';
import Table from '../stc/Table';
import Button from '../stc/Button.js';
import * as colors from '../../colors';

function NewOrdersTable(props) {
  const {newOrders, setEditIndex} = props;
  return (
    <Table className="new-orders-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Date</th>
          <th>Line</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Delivery Paid</th>
          <th>Postage</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {newOrders.map((item, index) => <tr key={shortid.generate()}>
          <td>{item.username}</td>
          <td>{item.creationDate}</td>
          <td>{item
              .items
              .map((line) => <span key={shortid.generate()}>{line.title}</span>)}</td>
          <td>{item
              .items
              .map((line) => <span key={shortid.generate()}>{line.quantity}</span>)}</td>
          <td>{item.total}</td>
          <td>{item
              .items
              .map((line) => <span key={shortid.generate()}>{line.deliveryCost}</span>)}</td>
          <td>{item.postage}</td>
          <td>
            <Button color={colors.lightBlue} onClick={() => setEditIndex(index)}>Edit</Button>
          </td>
        </tr>)}
      </tbody>
    </Table>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default NewOrdersTable;
