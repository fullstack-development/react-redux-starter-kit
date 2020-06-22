import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { RadioGroupInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';
import { TranslateFunction } from 'services/i18n';

type IProps = React.ComponentProps<typeof RadioGroupInput> & FieldRenderProps & { t: TranslateFunction };

function RadioGroupInputFieldComponent(props: IProps) {
  const { input, meta, t, ...rest } = props;
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error
    : meta.touched && meta.error;
  return (
    <RadioGroupInput {...rest} helperText={error && t(error)} error={Boolean(error)} {...input} />
  );
}

export const RadioGroupInputField = getFieldWithComponent(RadioGroupInputFieldComponent);
