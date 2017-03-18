import React from 'react';
import { reduxForm, reset } from 'redux-form';
import { push } from 'react-router-redux';
import Form from '../stc/Form';
import BottomNav from './BottomNav';
import ConsignmentTable from './ConsignmentTable';
import ProductsTable from './ProductsTable';

// import validate from './validate';


const AddConsignmentPage3 = (props) => {
  const { handleSubmit, formPageNumber, previousPage, error, setPageTo1, submitting } = props;
  return (
    <div>
      <ConsignmentTable {...props} />
      <ProductsTable {...props} />
      <Form onSubmit={handleSubmit}>
        {error && <strong>{error}</strong>}
        <div>
          <BottomNav {...props} />
        </div>
      </Form>
    </div>
  );
};

export default reduxForm({
  form: 'addConsignment',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmitSuccess: (result, dispatch, props) => {
    setTimeout(() => {
      dispatch(props.setPageTo1());
      dispatch(reset('addConsignment'));
      dispatch(push('/'));
    }, 3000);
  },
})(AddConsignmentPage3);
