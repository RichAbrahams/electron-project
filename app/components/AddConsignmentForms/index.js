import React from 'react';
import toastr from 'toastr';
import { SubmissionError } from 'redux-form';
import SectionSubHeader from '../SectionSubHeader';
import Wrapper from '../stc/SectionInnerWrapper';
import AddConsignmentPage1 from './AddConsignmentPage1';
import AddConsignmentPage2 from './AddConsignmentPage2';
import AddConsignmentPage3 from './AddConsignmentPage3';
import buildConsignment from '../..//businessLogic.js/buildConsignment';
import buildProducts from '../../businessLogic.js/buildProducts';
import { consignment as mockConsignment, products as mockProducts } from '../../businessLogic.js/mocks';
import handleConsignmentSubmit from '../../reduxFormHandlers/handleConsignmentSubmit';

function AddConsignmentForms(props) {
  const { formPageNumber, subtext, nextForm, previousForm, saveConsignment, } = props;

  const handleSubmit = (data) => {
    const consignment = buildConsignment(data);
    toastr.options = {
      positionClass: 'toast-bottom-right'
    };
    return handleConsignmentSubmit(consignment).then(() => {
      toastr.success('Consignment saved');
    }).catch((err) => {
      toastr.error('Consignment save error');
      throw new SubmissionError({
        _error: `Failed to save consignment, please check ID's ${err.toString()}`
      });
    });
  };

  return (
    <Wrapper className="innerWrapper">
      <SectionSubHeader text={subtext} icon="tag" /> {formPageNumber === 1 && <AddConsignmentPage1 onSubmit={() => nextForm()} {...props} />}
      {formPageNumber === 2 && <AddConsignmentPage2 onSubmit={() => nextForm()} {...props} />}
      {formPageNumber === 3 && <AddConsignmentPage3 onSubmit={(data) => handleSubmit(data)} {...props} />}
    </Wrapper>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

export default AddConsignmentForms;
