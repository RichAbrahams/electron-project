import React from 'react';
import Button from '../stc/Button';
import * as colors from '../../colors';
import ProgressIndicator from '../ProgressIndicator';
import H3 from '../stc/H3';

function PrintOrdersControls(props) {
  const { orders, message, phase, getUnprintedOrders, printOrders, home } = props;

  return (
    <div>
      <H3 margin="0em 0em 1em 0em">{message}</H3>
      <div className="print-orders-controls">
        {phase === 'start' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
          onClick={() => getUnprintedOrders()}
        >Retrieve Orders</Button>}
        {phase === 'print' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
          onClick={() => printOrders()}
        >Print Invoices</Button>}
        {phase === 'finished' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
        >Save as printed</Button>}
        {phase === 'error' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
          onClick={() => home()}
        >Back</Button>}
      </div>
      {phase === 'wait' && <ProgressIndicator text="Please wait" />}
    </div>
  );
}
  // AddConsignmentProducts.propTypes = {addConsignmentProduct :
  // React.PropTypes.func.isRequired}

export default PrintOrdersControls;
