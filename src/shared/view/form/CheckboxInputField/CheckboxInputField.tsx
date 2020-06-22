import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { CheckboxInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';
import { TranslateFunction } from 'services/i18n';

type IProps = React.ComponentProps<typeof CheckboxInput> & FieldRenderProps & { t: TranslateFunction };

function CheckboxInputFieldComponent(props: IProps) {
  const { input, meta, t, ...rest } = props;
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error
    : meta.touched && meta.error;
  const value = typeof input.value === 'boolean' ? undefined : input.value;
  return (
    <CheckboxInput
      {...rest}
      helperText={error && t(error)}
      error={Boolean(error)}
      {...input}
      value={value}
    />
  );
}

export const CheckboxInputField = getFieldWithComponent(CheckboxInputFieldComponent, 'checkbox');
