import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { RadioGroupInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';
import { TranslateFunction } from 'services/i18n';

type IProps = GetProps<typeof RadioGroupInput> & FieldRenderProps & { t: TranslateFunction };

function RadioGroupInputField(props: IProps) {
  const { input, meta, t, ...rest } = props;
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error
    : meta.touched && meta.error;
  return (
    <RadioGroupInput {...rest} helperText={error && t(error)} error={Boolean(error)} {...input} />
  );
}

export default getFieldWithComponent(RadioGroupInputField);
