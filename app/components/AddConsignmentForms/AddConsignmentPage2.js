import React from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import ContainerDimensions from 'react-container-dimensions';
import FormRow from '../stc/FormRow';
import Form from '../stc/Form';
import BottomNav from './BottomNav';
import renderField from './RenderField';
import renderSelectList from './RenderSelectList';
import Button from '../stc/Button';
import * as colors from '../../colors';
import TransformedDiv from '../stc/TransformedDiv';
import ValidateErrorMsg from '../stc/ValidateErrorMsg';
import H4 from '../stc/H4';
import Icon from '../stc/Icon';
import validate from './validate';

const renderProduct = ({
  fields,
  meta: {
    touched,
    error
  },
  categories
}) => (
  <ul>
    <li>
      {error && <ValidateErrorMsg className="error">{error}</ValidateErrorMsg>}
    </li>
    {fields.map((product, index) => <li key={index}>
      <H4 color={colors.darkBlue}>Product {index + 1}</H4>
      <FormRow className="form-row">
        <Field
          name={`${product}.productID`}
          type="text"
          component={renderField}
          label="ID"
          width={6}
        />
        <Field
          name={`${product}.productName`}
          type="text"
          component={renderField}
          label="Product Name"
        />
        <Field
          name={`${product}.dateAdded`}
          type="text"
          component={renderField}
          label="Date"
          defaultValue={Date.now()}
        />
        <Field
          name={`${product}.costUSD`}
          type="number"
          step="any"
          component={renderField}
          label="Cost (USD)"
        />
        <ContainerDimensions>
          {({ width }) => <TransformedDiv translateX={width - 88} translateY={-23}>
            <Icon
              name="minus-square"
              size="2x"
              color={colors.orange}
              onClick={() => fields.remove(index)}
            />
          </TransformedDiv>
}
        </ContainerDimensions>
      </FormRow>
      <FormRow className="form-row">
        <Field
          name={`${product}.weightKG`}
          type="number"
          step="any"
          component={renderField}
          label="Weight (Kg)"
        />
        <Field
          name={`${product}.quantity`}
          type="number"
          step="1"
          component={renderField}
          label="Quantity"
        />
        <Field
          name={`${product}.packSize`}
          type="number"
          step="1"
          component={renderField}
          label="Pack Size"
        />
      </FormRow>
      <FormRow className="form-row">
        <Field
          name={`${product}.packagingCostGBP`}
          type="number"
          step="any"
          component={renderField}
          label="Packaging"
        />
        <Field
          name={`${product}.postageGBP`}
          type="number"
          step="any"
          component={renderField}
          label="Postage"
        />
        <Field
          name={`${product}.category`}
          categories={categories}
          component={renderSelectList}
          label="Category"
        />
      </FormRow>
    </li>)}
  </ul>
);

const AddConsignmentPage2 = (props) => {
  const { handleSubmit, formPageNumber, previousPage, addProduct, categories } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FieldArray name="products" component={renderProduct} categories={categories} />
      <div>
        <BottomNav {...props} />
      </div>
    </Form>
  );
};
export default reduxForm({
  form: 'addConsignment', destroyOnUnmount: false, forceUnregisterOnUnmount: true,
  //validate,
})(AddConsignmentPage2);