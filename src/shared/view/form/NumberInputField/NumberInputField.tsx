import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { NumberInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';
import { TranslateFunction } from 'services/i18n';

type IProps = React.ComponentProps<typeof NumberInput> & FieldRenderProps & { t: TranslateFunction };

class NumberInputFieldComponent extends React.Component<IProps> {
  public render() {
    const { input, meta, t, ...rest } = this.props;
    const error = typeof rest.error === 'boolean'
      ? rest.error && meta.error
      : meta.touched && meta.error;
    return (
      <NumberInput
        {...rest}
        helperText={error && t(error)}
        error={Boolean(error)}
        {...input}
        onChange={this.onChange}
      />
    );
  }

  private onChange: React.ComponentProps<typeof NumberInput>['onChange'] = value => {
    const { input } = this.props;
    input.onChange(value.floatValue);
  };
}

export const NumberInputField = getFieldWithComponent(NumberInputFieldComponent);
