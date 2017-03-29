import React from 'react';
import shortid from 'shortid';
import Invoice from './invoice';

function PrintOrdersInner(props) {
  const {orders, phase} = props;

  return (
    <div className="print-orders">
      {orders.map((order) => {
        return <Invoice order={order} key={shortid.generate()} />;
      })}
    </div>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default PrintOrdersInner;
