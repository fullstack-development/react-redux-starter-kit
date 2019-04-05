import React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

interface IOption<T extends string | number = string | number> {
  value: T;
  label: string | number | object;
}

interface IProps extends StandardTextFieldProps {
  options: IOption[];
}

function Select(props: IProps) {
  const { options, ...textInputProps } = props;
  return (
    <TextField select {...textInputProps} fullWidth>
      {options.map(({ value, label }: IOption) => <MenuItem value={value} key={value}>{label}</MenuItem>)}
    </TextField>
  );
}

export { IOption as ISelectOption };
export default Select;
