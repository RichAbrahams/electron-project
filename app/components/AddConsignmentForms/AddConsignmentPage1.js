import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormRow from '../stc/FormRow';
import Form from '../stc/Form';
import BottomNav from './BottomNav';
import renderField from './RenderField';
import asyncValidate from '../../reduxFormHandlers/validateConsignmentID';
import validate from './validate';

const AddConsignmentPage1 = (props) => {
  const { handleSubmit, formPageNumber } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow className="form-row">
        <Field name="consignmentID" type="text" component={renderField} label="Consignment ID" />
        <Field name="weightKG" type="number" step="any" component={renderField} label="Weight" />
        <Field name="dateAdded" type="text" component={renderField} label="Date" />
      </FormRow>
      <FormRow className="form-row">
        <Field name="totalUSD" type="number" step="any" component={renderField} label="USD Total" />
        <Field name="productsTotalUSD" type="number" step="any" component={renderField} label="Products Total" />
        <Field name="agentServiceUSD" type="number" step="any" component={renderField} label="Agent Fee" />
        <Field name="shippingUSD" type="number" step="any" component={renderField} label="Shipping" />
        <Field name="chnCustomsUSD" type="number" step="any" component={renderField} label="CHN Customs" />
      </FormRow>
      <FormRow className="form-row">
        <Field name="totalGBP" type="number" step="any" component={renderField} label="GBP Total" />
        <Field name="ukVatGBP" type="number" step="any" component={renderField} label="UK VAT" />
        <Field name="ukDutyGBP" type="number" step="any" component={renderField} label="UK DUTY" />
        <Field name="ukClearanceGBP" type="number" step="any" component={renderField} label="UK Clearence" />
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
  //validate,
  asyncValidate,
  asyncBlurFields: ['consignmentID'],
})(AddConsignmentPage1);

