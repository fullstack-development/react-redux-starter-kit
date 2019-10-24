import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { TextInput, TextInputProps } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';
import { TranslateFunction } from 'services/i18n';

type IProps = TextInputProps & FieldRenderProps & { t: TranslateFunction };

function TextInputFieldComponent(props: IProps) {
  const { input, meta, t, ...rest } = props;
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error
    : meta.touched && meta.error;

  return (
    <TextInput
      {...rest}
      helperText={error && t(error)}
      error={Boolean(error)}
      {...input}
    />
  );
}

export const TextInputField = getFieldWithComponent(TextInputFieldComponent);
