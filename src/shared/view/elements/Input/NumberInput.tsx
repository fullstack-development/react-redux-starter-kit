import React from 'react';
import * as R from 'ramda';
import { O } from 'ts-toolbelt';
import NumberFormat, { NumberFormatProps, NumberFormatValues } from 'react-number-format';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

import { TextInput, IProps as ITextInputProps } from './TextInput';

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

type IProps = O.Merge<ICustomProps, ITextInputProps> & INumberProps;

const makeNumberInput = R.memoizeWith(
  R.toString,
  (ownProps: NumberFormatProps) =>
    function NumberFormatCustom(props: O.Merge<ICustomProps, InputBaseComponentProps>) {
      const { inputRef, onChange, ...other } = props;

      return (
        <NumberFormat
          {...ownProps}
          {...other}
          getInputRef={inputRef}
          onValueChange={onChange}
        />
      );
    },
);

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
          inputComponent: makeNumberInput({ prefix, thousandSeparator, decimalScale }) as any,
        }}
        fullWidth
      />
    );
  }
}

export { NumberInput };
