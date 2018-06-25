import * as React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

function TextInput(props: TextFieldProps) {
  return (
    <TextField fullWidth {...props} />
  );
}

export { TextFieldProps as IProps };
export default TextInput;
