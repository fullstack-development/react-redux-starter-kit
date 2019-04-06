import React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { ISelectOption } from 'shared/types/form';

interface IProps extends StandardTextFieldProps {
  options: ISelectOption[];
}

function Select(props: IProps) {
  const { options, ...textInputProps } = props;
  return (
    <TextField select {...textInputProps} fullWidth>
      {options.map(({ value, label }: ISelectOption) => <MenuItem value={value} key={value}>{label}</MenuItem>)}
    </TextField>
  );
}

export default Select;
