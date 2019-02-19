import React from 'react';
import * as R from 'ramda';
import { MergeRight } from '_helpers';
import NumberFormat, { NumberFormatProps, NumberFormatValues } from 'react-number-format';

import { InputBaseComponentProps } from '@material-ui/core/InputBase';

import TextInput, { IProps as ITextInputProps } from './TextInput';

interface ICustomProps {
  value: number;
  defaultValue?: number;
  onChange(value: NumberFormatValues): void;
}

interface INumberProps {
  thousandSeparator?: boolean | string;
  prefix?: string;
  decimalScale?: number;
}

type IProps = MergeRight<ITextInputProps, ICustomProps> & INumberProps;

const makeNumberInput = R.memoizeWith(R.toString, (ownProps: NumberFormatProps) => {
  return function NumberFormatCustom(props: MergeRight<InputBaseComponentProps, ICustomProps>) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...ownProps}
        {...other}
        getInputRef={inputRef}
        onValueChange={onChange}
      />
    );
  };
});

class NumberInput extends React.PureComponent<IProps> {
  public render() {
    const { thousandSeparator, prefix, decimalScale, ...rest } = this.props;
    return (
      <TextInput
        {...rest}
        onChange={rest.onChange as any}
        InputLabelProps={{
          ...rest.InputLabelProps,
          shrink: true,
        }}
        InputProps={{
          ...rest.InputProps,
          inputComponent: makeNumberInput({ prefix, thousandSeparator, decimalScale }),
        }}
        fullWidth
      />
    );
  }
}

export default NumberInput;
