import * as React from 'react';
import * as R from 'ramda';
import { GetProps, MarkAsPartial, SubSet } from '_helpers';
import MaskedInput from 'react-text-mask';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { EyeIcon, MoneyIcon } from '../Icons';
import { bind } from 'decko';

type MaskType = 'visa';

// crutch for types :)
type PartialProps = SubSet<
  keyof TextFieldProps,
  | 'className' | 'classes' | 'defaultValue' | 'variant' | 'style' | 'innerRef'
  | 'inputProps' | 'InputProps' | 'inputRef' | 'rows' | 'rowsMax' | 'value'
>;

type IProps = MarkAsPartial<TextFieldProps, PartialProps> & {
  maskType?: MaskType;
};

interface IState {
  type?: string;
}

const maskByType: Record<MaskType, GetProps<typeof MaskedInput>['mask']> = {
  visa: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
};

const makeMaskInput = R.memoizeWith(R.identity, (maskType: MaskType) => {
  return function TextMaskCustom(props: InputBaseComponentProps) {
    const { inputRef, value, defaultValue, ...other } = props;

    return (
      <MaskedInput
        {...other}
        value={value as GetProps<typeof MaskedInput>['value']}
        defaultValue={defaultValue as GetProps<typeof MaskedInput>['defaultValue']}
        ref={inputRef}
        mask={maskByType[maskType]}
        showMask
      />
    );
  };
});

class TextInput extends React.PureComponent<IProps, IState> {
  public state: IState = {
    type: this.props.type,
  };

  public render() {
    const { maskType, ...restProps } = this.props;
    const { type } = this.state;

    return (
      <TextField
        {...restProps as TextFieldProps}
        type={type}
        InputLabelProps={{
          shrink: maskType && true,
        }}
        InputProps={{
          inputComponent: maskType && makeMaskInput(maskType),
          endAdornment: this.renderEndAdornment(),
        }}
      />
    );
  }

  private renderEndAdornment(): React.ReactNode {
    const { type, maskType } = this.props;

    if (type === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="Toggle password visibility"
            onClick={this.handleClickShowPassword}
          >
            <EyeIcon />
          </IconButton>
        </InputAdornment>
      );
    }
    if (maskType === 'visa') {
      return (
        <InputAdornment position="end">
          <MoneyIcon />
        </InputAdornment>
      );
    }
  }

  @bind
  private handleClickShowPassword() {
    this.setState(state => ({
      type: state.type === 'password' ? 'text' : 'password',
    }));
  }
}

export default TextInput;
