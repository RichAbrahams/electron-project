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
    showButton,
    message,
    finish
  } = props;

  return (
    <div>
      <H3 margin="0em 0em 1em 0em">{message}</H3>
      <div className="download-orders-controls">
        {showButton === 'download' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
          onClick={() => getNewOrders(accessToken)}>Download</Button>}
        {showButton === 'save' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
          onClick={() => saveNewOrders(newOrders)}>Save</Button>}
        {showButton === 'finish' && <Button
          margin="0em 1em 1em 1em"
          color={colors.darkBlue}
          onClick={() => finish()}>Finish</Button>}
      </div>
      {downloading && <ProgressIndicator text="Download in progress"/>}
    </div>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default DownloadOrdersControls;
