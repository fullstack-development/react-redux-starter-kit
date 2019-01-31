import * as React from 'react';
import { bind } from 'decko';
import { Omit } from '_helpers';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

interface IOption<T extends string | number = string | number> {
  value: T;
  label: string | number;
}

interface IState {
  selectedOptionValue: string | number;
}

interface IProps extends Omit<StandardTextFieldProps, 'value' | 'onChange'> {
  options: IOption[];
}

class Select extends React.Component<IProps, IState> {
  public state: IState = {
    selectedOptionValue: this.props.options[0].value,
  };

  public render() {
    const { options, ...textInputProps } = this.props;
    const { selectedOptionValue } = this.state;
    return (
      <TextField select value={selectedOptionValue} onChange={this.handleSelectChange} {...textInputProps}>
        {options.map(this.renderOption)}
      </TextField>
    );
  }

  @bind
  private renderOption({ value, label }: IOption) {
    return <MenuItem value={value} key={value}>{label}</MenuItem>;
  }

  @bind
  private handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ selectedOptionValue: e.target.value });
  }
}

export { IOption as ISelectOption };
export default Select;
