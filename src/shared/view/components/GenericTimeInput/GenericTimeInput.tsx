import * as React from 'react';
import { bind } from 'decko';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';
import TextInput, { EventType } from './../../elements/TextInput/TextInput';
import InputGroup from '../../elements/InputGroup/InputGroup';
import Errors from '../../elements/Errors/Errors';
import Component = React.Component;

interface IState {
  errors: string[];
  isEdited: boolean;
}

class GenericTimeInput extends Component<GenericFieldProps, IState> {
  private errors = {
    invalid: 'Incorrect Time format, expected hh:mm',
  };

  constructor(props: GenericFieldProps) {
    super(props);
    this.state = {
      errors: [],
      isEdited: false,
    };
  }

  public componentDidMount() {
    this.validateAndChange('');
  }

  public render() {
    const { name, label, placeholder } = this.props;
    const { errors, isEdited } = this.state;

    return (
      <InputGroup label={label}>
        <TextInput
          type="time"
          name={name}
          placeholder={placeholder}
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
  private validateAndChange(value: string): void {
    const { required, onChange, pattern } = this.props;
    const errors: string[] = [];

    if (required && !value.length) {
      errors.push('Field is required');
    } else if (pattern && !(new RegExp(pattern)).test(value)) {
      errors.push(this.errors.invalid);
    }

    this.setState({ ...this.state, errors });

    if (onChange) {
      onChange(value, errors);
    }
  }
}

export default GenericTimeInput;
