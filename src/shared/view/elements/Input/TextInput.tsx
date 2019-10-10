import React from 'react';
import { autobind } from 'core-decorators';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Adjust from '@material-ui/icons/Adjust';

type IProps = Omit<TextFieldProps, 'ref'>;

interface IState {
  type?: string;
}

class TextInput extends React.PureComponent<IProps, IState> {
  public state: IState = {
    type: this.props.type,
  };

  public render() {
    const { type } = this.state;

    return (
      <TextField
        {...this.props as TextFieldProps}
        type={type}
        InputProps={{
          ...this.props.InputProps,
          endAdornment: this.renderEndAdornment(),
        }}
        fullWidth
      />
    );
  }

  private renderEndAdornment(): React.ReactNode {
    const { type } = this.props;

    if (type === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="Toggle password visibility"
            onClick={this.handleClickShowPassword}
          >
            <Adjust />
          </IconButton>
        </InputAdornment>
      );
    }
  }

  @autobind
  private handleClickShowPassword() {
    this.setState(state => ({
      type: state.type === 'password' ? 'text' : 'password',
    }));
  }
}

export { IProps };
export default TextInput;
