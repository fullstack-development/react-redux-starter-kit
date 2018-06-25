import * as React from 'react';
import { Omit } from '_helpers';
import { Options } from 'react-select';
import 'react-select/dist/react-select.css';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';

import { provideStyles, StylesProps } from './Select.style';
import SelectWrapped, { SelectWrappedProps } from './SelectWrapped';

type CustomSelectProps =
  & StylesProps & Omit<TextFieldProps, 'classes' | 'inputProps'>
  & {
    selectProps?: Omit<SelectWrappedProps['selectProps'], 'options'>;
    options: Options;
  };

// https://material-ui.com/demos/autocomplete/#react-select
class CustomSelect extends React.Component<CustomSelectProps> {
  public render() {
    const { classes, selectProps, options, ...restProps } = this.props;

    return (
      <TextField
        fullWidth
        {...restProps}
        InputProps={{
          inputComponent: SelectWrapped as any,
          inputProps: {
            options,
            classes,
            ...selectProps,
          },
        }}
      />
    );
  }
}

export { Option } from 'react-select';
export default provideStyles(CustomSelect);
