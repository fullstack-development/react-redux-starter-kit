import * as React from 'react';
import GenericField from '../GenericInput/GenericInput';
import TextInput, { EventType } from './../../elements/TextInput/TextInput';
import InputGroup from './../../elements/InputGroup/InputGroup';
import FormEvent = React.FormEvent;
import Component = React.Component;
import Errors from '../../elements/Errors/Errors';

interface State {
  errors: Array<string>;
  isEdited: boolean;
}

class GenericDateInput extends React.Component<GenericField.Props, State> {
  private standardHTMLpattern = '^([0-9]{4})-([0-9]{2})-([0-9]{2})$';
  private errors = {
    invalid: 'Incorrect Date format',
  };

  constructor(props: GenericField.Props) {
    super(props);
    this.state = {
      errors: [],
      isEdited: false
    };
  }

  componentDidMount() {
    this.validateAndChange(''); // first changing with validation, but without showing errors
  }

  onChange = (event: EventType) => {
    const value: string = (event.nativeEvent.target as HTMLInputElement).value;
    this.validateAndChange(value);
    this.setState((prevState: State) => ({ ...prevState, isEdited: true }));
  }

  validateAndChange = (rawValue: string): void => {
    const { pattern, required, onChange } = this.props;
    let value: string;
    let errors: string[] = [];

    if ((new RegExp(this.standardHTMLpattern)).test(rawValue)) {
      // current browser support date inputs
      value = rawValue.split('-').reverse().join('-');
    } else {
      value = rawValue;
    }

    if (pattern && !(new RegExp(pattern)).test(value)) {
      errors.push(this.errors.invalid);
    }

    if (required && !value.length) {
      errors.push('Field is required');
    }

    this.setState({ ...this.state, errors });
    onChange(value, errors);
  }

  render() {
    const {
      name,
      label,
      pattern,
      placeholder,
    } = this.props;
    const { errors, isEdited } = this.state;

    return (
      <InputGroup label={label}>
        <TextInput
          type="date"
          name={name}
          placeholder={placeholder}
          pattern={pattern}
          onChange={this.onChange} />
        <Errors errors={this.props.errors ? errors.concat(this.props.errors) : errors} hidden={!isEdited} />
      </InputGroup>
    );
  }
}

export default GenericDateInput;