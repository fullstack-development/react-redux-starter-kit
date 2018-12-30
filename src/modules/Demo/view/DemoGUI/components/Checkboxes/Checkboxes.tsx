import * as React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import uuid = require('uuid');
import { SimpleList, Typography } from 'shared/view/elements';
import { CheckboxInputField } from 'shared/view/redux-form';
import { isRequired } from 'shared/validators';

interface IFormData {
  box1: boolean;
  box2: boolean;
  box3: boolean;
}

function Checkboxes(_props: InjectedFormProps<IFormData>) {
  return (
    <SimpleList marginFactor={0} gutter>
      <Typography variant="h4">CheckBoxes</Typography>
      <CheckboxInputField name="box1" label="Standard" />
      <CheckboxInputField name="box2" label="Required" required validate={isRequired} />
      <CheckboxInputField name="box3" label="Disabled checked" disabled checked />
    </SimpleList>
  );
}

export default (
  reduxForm<IFormData>({ form: uuid(), initialValues: {} })(
    Checkboxes,
  )
);
