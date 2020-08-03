import React from 'react';
import {autobind} from 'core-decorators';
import TextFieldBase, {TextFieldProps} from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Adjust from '@material-ui/icons/Adjust';
import {
  withStyles,
} from '@material-ui/core/styles';

type IProps = Omit<TextFieldProps, 'ref'>;

interface IState {
  type?: string;
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

class TextInput extends React.PureComponent<IProps, IState> {
  public state: IState = {
    type: this.props.type,
  };

  public render() {
    const {InputProps} = this.props;
    const {type} = this.state;

    return (
      <TextField
        {...this.props as TextFieldProps}
        type={type}
        InputProps={{
          ...InputProps,
          endAdornment: this.renderEndAdornment(),
        }}
        fullWidth
        variant="outlined"
      />
    );
  }

  private renderEndAdornment(): React.ReactNode {
    const {type} = this.props;

    return type === 'password' ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="Toggle password visibility"
          onClick={this.handleClickShowPassword}
        >
          <Adjust/>
        </IconButton>
      </InputAdornment>
    ) : null;
  }

  @autobind
  private handleClickShowPassword() {
    this.setState(state => ({
      type: state.type === 'password' ? 'text' : 'password',
    }));
  }
}

export {TextInput, IProps};
