import React from 'react';
import { A, B } from 'ts-toolbelt';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormLabel, { FormLabelProps } from '@material-ui/core/FormLabel';
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup';
import FormHelperText, { FormHelperTextProps } from '@material-ui/core/FormHelperText';

type IProps = RadioGroupProps & Pick<FormControlProps, 'error' | 'required' | 'fullWidth'> & {
  label?: React.ReactNode;
  helperText?: string;
  formLabelProps?: FormLabelProps;
  formHelperTextProps?: FormHelperTextProps;
};

interface INormalizedProps {
  formControlProps: FormControlProps;
  formHelperTextProps: FormHelperTextProps | null;
  formLabelProps: FormLabelProps | null;
  radioGroupProps: RadioGroupProps;
  other: {
    label: React.ReactNode | null;
    helperText: string | null;
  };
}

function RadioGroupInput(props: IProps) {
  const { formControlProps,
    radioGroupProps,
    formLabelProps,
    formHelperTextProps,
    other,
  } = normalizeProps(props);
  const { label, helperText } = other;

  return (
    <FormControl {...formControlProps}>
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <RadioGroup {...radioGroupProps} />
      {helperText && <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>}
    </FormControl>
  );
}

function normalizeProps(props: IProps): INormalizedProps {
  const {
    error,
    helperText = null,
    required,
    label,
    formLabelProps = null,
    formHelperTextProps = null,
    fullWidth,
    ...rest
  } = props;

  const radioGroupProps: A.Equals<RadioGroupProps, typeof rest> extends B.True ? RadioGroupProps : unknown = rest;
  const formControlProps: FormControlProps = { error, required, fullWidth };

  return {
    formHelperTextProps,
    formControlProps,
    radioGroupProps,
    formLabelProps,
    other: { label, helperText },
  };
}

export { RadioGroupInput };
