import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { CheckboxInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type IProps = GetProps<typeof CheckboxInput> & FieldRenderProps;

function CheckboxInputField(props: IProps) {
  const { classes, input, meta, ...rest } = props;
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error
    : meta.touched && meta.error;
  return (
    <CheckboxInput {...rest} helperText={error} error={Boolean(error)} {...input} />
  );
}

export default getFieldWithComponent(CheckboxInputField);
