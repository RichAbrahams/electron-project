import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormRow from '../stc/FormRow';
import Form from '../stc/Form';
import BottomNav from './BottomNav';
import renderField from './RenderField';
import asyncValidate from '../../reduxFormHandlers/checkUnique';
import validate from './validate';

const AddConsignmentPage1 = (props) => {
  const { handleSubmit, formPageNumber } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow className="form-row">
        <Field name="consignmentID" type="text" component={renderField} label="Consignment ID" />
        <Field name="weightKG" type="text" component={renderField} label="Weight" />
        <Field name="dateAdded" type="text" component={renderField} label="Date" />
      </FormRow>
      <FormRow className="form-row">
        <Field name="totalUSD" type="text" component={renderField} label="USD Total" />
        <Field name="productsTotalUSD" type="text" component={renderField} label="Products Total" />
        <Field name="agentServiceUSD" type="text" component={renderField} label="Agent Fee" />
        <Field name="shippingUSD" type="text" component={renderField} label="Shipping" />
        <Field name="chnCustomsUSD" type="text" component={renderField} label="CHN Customs" />
      </FormRow>
      <FormRow className="form-row">
        <Field name="totalGBP" type="text" component={renderField} label="GBP Total" />
        <Field name="ukVatGBP" type="text" component={renderField} label="UK VAT" />
        <Field name="ukDutyGBP" type="text" component={renderField} label="UK DUTY" />
        <Field name="ukClearanceGBP" type="text" component={renderField} label="UK Clearence" />
      </FormRow>
      <div>
        <BottomNav {...props} />
      </div>
    </Form>
  );
};

export default reduxForm({
  form: 'addConsignment',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    dateAdded: Date.now()
  },
  validate,
  asyncValidate,
  asyncBlurFields: ['consignmentID'],
})(AddConsignmentPage1);

