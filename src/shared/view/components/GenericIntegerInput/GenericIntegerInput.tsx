import * as React from 'react';
import { bind } from 'decko';
import GenericField from '../GenericInput/GenericInput';
import TextInput, { EventType } from 'shared/view/elements/TextInput/TextInput';
import InputGroup from 'shared/view/elements/InputGroup/InputGroup';

import SyntheticEvent = React.SyntheticEvent;
import FormEvent = React.FormEvent;
import Component = React.Component;
import Errors from '../../elements/Errors/Errors';

interface IProps extends GenericField.Props {
  minimum: number;
  maximum: number;
  isFloat?: boolean;
}

interface IState {
  errors: string[];
  isEdited: boolean;
}

class GenericIntegerInput extends React.Component<IProps, IState> {
  private errors = {
    required: 'Field is required',
    tooLow: 'Number value is too low',
    tooBig: 'Number value is too big',
    invalid: 'Number value is incorrect',
  };

  constructor(props: GenericField.Props) {
    super(props);
    this.state = {
      errors: [],
      isEdited: false,
    };
  }

  public componentDidMount() {
    const value: string = '';
    const errors: string[] = this.validate(value);
    this.change(value, errors);
  }

  public render() {
    const {
      name,
      isFloat,
      label,
      pattern,
      placeholder,
      minimum,
      maximum,
    } = this.props;
    const { errors, isEdited } = this.state;

    return (
      <InputGroup label={label}>
        <TextInput
          name={name}
          type="number"
          step={isFloat ? 0.01 : undefined}
          pattern={pattern}
          placeholder={placeholder}
          min={minimum}
          max={maximum}
          onChange={this.onChange}
        />
        <Errors errors={this.props.errors ? errors.concat(this.props.errors) : errors} hidden={!isEdited} />
      </InputGroup>
    );
  }

  @bind
  private onChange(event: EventType): void {
    const value = (event.nativeEvent.target as HTMLInputElement).value;
    const errors = this.validate(value);
    this.change(value, errors);
    this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
  }

  @bind
  private validate(value: string): string[] {
    const { isFloat, minimum, maximum, required } = this.props;
    const parsedValue: number = isFloat ? parseFloat(value) : parseInt(value, 10);
    const errors = [];

    if (required && !value) {
      errors.push(this.errors.required);
    } else if (isNaN(parsedValue)) {
      errors.push(this.errors.invalid);
    } else {
      if (minimum && parsedValue < minimum) {
        errors.push(this.errors.tooLow);
      }
      if (maximum && parsedValue > maximum) {
        errors.push(this.errors.tooBig);
      }
    }

    this.setState({ ...this.state, errors });

    return errors;
  }

  @bind
  private change(value: string, errors: string[]) {
    const handler = this.props.onChange;
    if (handler) {
      handler(value.toString(), errors);
    }
  }

}

export default GenericIntegerInput;
