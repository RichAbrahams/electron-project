import React from 'react';
import toastr from 'toastr';
import SectionSubHeader from '../SectionSubHeader';
import Wrapper from '../stc/SectionInnerWrapper';

function DownloadOrdersButton(props) {
  const {} = props;

  return (
    <Wrapper className="innerWrapper">
      <SectionSubHeader text="New Orders" icon="tag" />
      hello
    </Wrapper>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default DownloadOrdersButton;
