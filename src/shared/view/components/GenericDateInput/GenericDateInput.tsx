import * as React from 'react';
import { bind } from 'decko';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';
import TextInput, { EventType } from './../../elements/TextInput/TextInput';
import InputGroup from './../../elements/InputGroup/InputGroup';
import Errors from '../../elements/Errors/Errors';
import FormEvent = React.FormEvent;
import Component = React.Component;

type IProps = GenericFieldProps;
interface IState {
  errors: string[];
  isEdited: boolean;
}

class GenericDateInput extends React.PureComponent<IProps, IState> {
  private standardHTMLpattern = '^([0-9]{4})-([0-9]{2})-([0-9]{2})$';
  private errors = {
    invalid: 'Incorrect Date format',
    required: 'Field is required',
  };

  constructor(props: GenericFieldProps) {
    super(props);
    this.state = {
      errors: [],
      isEdited: false,
    };
  }

  public componentDidMount() {
    this.validateAndChange(''); // first changing with validation, but without showing errors
  }

  public render() {
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
          onChange={this.onChange}
        />
        <Errors errors={this.props.errors ? errors.concat(this.props.errors) : errors} hidden={!isEdited} />
      </InputGroup>
    );
  }

  @bind
  private onChange(event: EventType) {
    const value: string = (event.nativeEvent.target as HTMLInputElement).value;
    this.validateAndChange(value);
    this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
  }

  @bind
  private validateAndChange(rawValue: string): void {
    const { pattern, required, onChange } = this.props;
    const errors: string[] = [];
    let value: string;

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
      errors.push(this.errors.required);
    }

    this.setState({ ...this.state, errors });

    if (onChange) {
      onChange(value, errors);
    }
  }
}

export { IProps, IState };
export default GenericDateInput;
