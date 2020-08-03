import React from 'react';
import TextFieldBase, {StandardTextFieldProps} from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import {ISelectOption} from 'shared/types/form';
import {withStyles} from "@material-ui/core/styles";

interface IProps extends StandardTextFieldProps {
  options: ISelectOption[];
}

const TextField = withStyles({
  root: {
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, -6px) scale(0.75)',
      background: 'white',
      padding: '0 5px',
      marginLeft: '-5px',
    },
    '& .MuiOutlinedInput-input': {
      padding: "15px 16px 14px"
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px'
    }
  },
})(TextFieldBase);

function Select(props: IProps) {
  const {options, ...textInputProps} = props;
  return (
    <TextField select {...textInputProps} fullWidth variant="outlined">
      {options.map(({value, label}: ISelectOption) => (
        <MenuItem value={value} key={value}>{label}</MenuItem>
      ))}
    </TextField>
  );
}

export {Select};
