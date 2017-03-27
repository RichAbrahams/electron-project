import React from 'react';
import Button from '../stc/Button';
import * as colors from '../../colors';
import ProgressIndicator from '../ProgressIndicator';
import H3 from '../stc/H3';

function DownloadOrdersControls(props) {
  const {
    getNewOrders,
    downloading,
    accessToken,
    saveNewOrders,
    newOrders,
    phase,
    message,
    finish
  } = props;

  return (
    <div>
      <H3 margin="0em 0em 1em 0em">{message}</H3>
      <div className="download-orders-controls">
        {phase === 'start' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
          onClick={() => getNewOrders(accessToken)}>Download</Button>}
        {phase === 'save' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
          onClick={() => saveNewOrders(newOrders)}>Save</Button>}
        {phase === 'finished' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
          onClick={() => finish()}>Print Orders</Button>}
      </div>
      {phase === 'wait' && <ProgressIndicator text="Please wait" />}
    </div>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default DownloadOrdersControls;
