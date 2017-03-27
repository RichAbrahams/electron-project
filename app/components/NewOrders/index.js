import React from 'react';
import Table from '../stc/Table';
import NewOrdersTable from './NewOrdersTable';
import Edit from './edit';

function NewOrders(props) {
  const {newOrders, editOrder, editIndex} = props;
  const handleSubmit = (data) => {
    console.log('handleSubmit', data);
    editOrder(data);
  };

  return (
    <div className="new-orders">
      {(!editIndex && newOrders.length) && <NewOrdersTable {...props} />}
      {editIndex && <Edit {...props} onSubmit={(data) => handleSubmit(data)} />}
    </div>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default NewOrders;
