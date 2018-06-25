import * as React from 'react';
import { bind } from 'decko';

import { TextInput } from '../../elements';
import InputGroup from '../../elements/InputGroup/InputGroup';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';

import FormEvent = React.FormEvent;

interface IState {
  isEdited: boolean;
  error: string;
}

class GenericTextInput extends React.Component<GenericFieldProps, IState> {
  public state: IState = {
    error: '',
    isEdited: false,
  };

  public componentDidMount() {
    this.changeValue(''); // first changing with validation, but without showing errors
  }

  public render() {
    const {
      name,
      label,
      placeholder,
    } = this.props;
    const { error, isEdited } = this.state;

    return (
      <InputGroup label={label}>
        <TextInput
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={this.onChange}
          error={isEdited && !!error}
          helperText={isEdited && error}
        />
      </InputGroup>
    );
  }

  @bind
  private onChange(event: FormEvent<HTMLInputElement>): void {
    const value = (event.nativeEvent.target as HTMLInputElement).value;
    this.changeValue(value);

    if (!this.state.isEdited) {
      this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
    }
  }

  @bind
  private changeValue(value: string): void {
    const { required, onChange } = this.props;
    const error: string = required && !value.length ? 'Field is required' : '';

    this.setState({ ...this.state, error });

    if (onChange) {
      onChange(value, error);
    }
  }

}

export default GenericTextInput;
