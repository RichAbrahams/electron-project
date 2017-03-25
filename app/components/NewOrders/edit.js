import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import FormRow from '../stc/FormRow';
import Form from '../stc/Form';
import renderField from './RenderField';
import Button from '../stc/Button';
import * as colors from '../../colors';

function EditNewOrderForm(props) {
  const {editOrder, handleSubmit,resetEditIndex, submitting} = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow className="form-row">
        <Field name="username" type="text" component={renderField} label="username"/>
        <Field name="postage" type="text" component={renderField} label="postage"/>
        <Field name="packaging" type="text" component={renderField} label="packaging"/>
      </FormRow>
      <div>
        <Button
          type="button"
          color={colors.darkBlue}
          margin="0 0 0 1em"
          onClick={() => resetEditIndex()}>Back</Button>
        <Button
          type="submit"
          color={colors.darkBlue}
          margin="0 0 0 1em"
          disabled={submitting}>Save</Button>
      </div>
    </Form>
  );
}

// AddConsignmentProducts.propTypes = {   addConsignmentProduct:
// React.PropTypes.func.isRequired };

EditNewOrderForm = reduxForm({
  form: 'EditNewOrder' // a unique identifier for this form
})(EditNewOrderForm);

// You have to connect() to any reducers that you wish to connect to yourself
EditNewOrderForm = connect(state => ({
  initialValues: state.downloadOrders.newOrders[state.downloadOrders.editIndex - 1] // pull initial values from account reducer
}) // bind account loading action creator
)(EditNewOrderForm);

export default EditNewOrderForm;
