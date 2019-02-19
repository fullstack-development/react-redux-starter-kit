import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { MaskedInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type IProps = GetProps<typeof MaskedInput> & FieldRenderProps;

function MaskedInputField(props: IProps) {
  const { input, meta, ...rest } = props;
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error
    : meta.touched && meta.error;
  return (
    <MaskedInput {...rest} helperText={error} error={Boolean(error)} {...input} />
  );
}

export default getFieldWithComponent(MaskedInputField);
