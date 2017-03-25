import React from 'react';
import Wrapper from '../stc/SectionInnerWrapper';
import Table from '../stc/Table';
import NewOrdersTable from './NewOrdersTable';
import Edit from './edit';

function NewOrders(props) {
  const {newOrders, editIndex, handleSubmit } = props;
  return (
    <Wrapper>
      {!editIndex && <NewOrdersTable {...props} />}
      {editIndex && <Edit {...props} onSubmit={(data) => handleSubmit(data)} />}
    </Wrapper>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default NewOrders;
