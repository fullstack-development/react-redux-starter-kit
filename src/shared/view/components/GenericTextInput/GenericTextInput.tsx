import * as React from 'react';
import { FormControlProps } from 'react-bootstrap';
import { bind } from 'decko';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';
import TextInput from './../../elements/TextInput/TextInput';
import InputGroup from './../../elements/InputGroup/InputGroup';
import Errors from '../../elements/Errors/Errors';

import SyntheticEvent = React.SyntheticEvent;
import FormEvent = React.FormEvent;
import Component = React.Component;

interface IProps extends GenericFieldProps {
  minLength: number;
  maxLength: number;
}

interface IState {
  isEdited: boolean;
  errors: string[];
}

class GenericTextInput extends React.Component<IProps, IState> {
  public state: IState = {
    errors: [],
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
      minLength,
      maxLength,
    } = this.props;
    const { errors, isEdited } = this.state;

    return (
      <InputGroup label={label}>
        <TextInput
          type="text"
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          onChange={this.onChange}
        />
        <Errors errors={this.props.errors ? errors.concat(this.props.errors) : errors} hidden={!isEdited} />
      </InputGroup>
    );
  }

  @bind
  private onChange(event: FormEvent<Component<FormControlProps, {}>>): void {
    const value = (event.nativeEvent.target as HTMLInputElement).value;
    this.changeValue(value);

    if (!this.state.isEdited) {
      this.setState((prevState: IState, props: IProps) => ({ ...prevState, isEdited: true }));
    }
  }

  @bind
  private changeValue(value: string): void {
    const { required, onChange } = this.props;
    const errors: string[] = [];

    if (required && !value.length) {
      errors.push('Field is required');
    }

    this.setState({ ...this.state, errors });

    if (onChange) {
      onChange(value, errors);
    }
  }

}

export default GenericTextInput;
