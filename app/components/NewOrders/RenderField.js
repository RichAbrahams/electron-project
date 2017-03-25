import React from 'react'
import TextInput from '../stc/TextInput';
import FormFieldContainer from '../stc/FormFieldContainer';
import Label from '../stc/Label';
import ValidateErrorMsg from '../stc/ValidateErrorMsg';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FormFieldContainer className="form-field">
    <Label>{label}</Label>
    <div>
      <TextInput className="text-input" width={10} {...input} placeholder={label} type={type} />
    </div>
  </FormFieldContainer>
);

export default renderField;
