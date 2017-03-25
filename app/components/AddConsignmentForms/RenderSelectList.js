import React from 'react';
import TextInput from '../stc/TextInput';
import FormFieldContainer from '../stc/FormFieldContainer';
import Label from '../stc/Label';
import ValidateErrorMsg from '../stc/ValidateErrorMsg';
import SelectList from '../stc/SelectList';
const renderField = ({
  categories,
  input,
  label,
  type,
  meta: {
    touched,
    error
  }
}) => (
  <FormFieldContainer className="form-field">
    <Label>{label}</Label>
    <div>
      { console.log('inside render select', categories)}
      {touched && error && <ValidateErrorMsg className="error"/>}
      <SelectList className="select" {...input} type="select">
        {categories.map(val => <option value={val} key={val}>{val}</option>)}
      </SelectList>
    </div>
  </FormFieldContainer>
);

export default renderField;
