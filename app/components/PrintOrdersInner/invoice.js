import React from 'react';
import CustomerAddress from './customerAddress';
import CustomerInvoice from './customerInvoice';
import Items from './table';

function Invoice(props) {
  const {order} = props;

  return (
    <CustomerInvoice className="invoice">
      <div className="logo"></div>
      <CustomerAddress className="customer-address">
        {order.address[0].fullName && <span>{order.address[0].fullName.toUpperCase()}</span>}
        {order.address[0].addressLine1 && <span>{order.address[0].addressLine1.toUpperCase()}</span>}
        {order.address[0].addressLine2 && <span>{order.address[0].addressLine2.toUpperCase()}</span>}
        {order.address[0].city && <span>{order.address[0].city.toUpperCase()}</span>}
        {order.address[0].postalCode && <span>{order.address[0].postalCode.toUpperCase()}</span>}
        {order.address[0].countryCode && <span>{order.address[0].countryCode.toUpperCase()}</span>}
      </CustomerAddress>
      <div className="items"></div>
      <Items order={order} />
      <div className="footer"></div>
    </CustomerInvoice>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default Invoice;
