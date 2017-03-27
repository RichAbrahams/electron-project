import React from 'react';
import Button from './stc/Button';
import * as colors from '../colors';
import Icon from './stc/Icon';
import H2Centered from './stc/H2-Centered';
import DivCentered from './stc/DivCentered';

function ProgressIndicator(props) {

  const { text } = props;
  return (
    <div className="download-indicator" >
      <H2Centered color="#999">{text}</H2Centered>
      <Icon name="cog" size="3x" color="#999" spin />
    </div>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default ProgressIndicator;
