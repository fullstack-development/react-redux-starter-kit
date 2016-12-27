import * as React from 'react';
import GenericField from '../GenericInput/GenericInput';
import TextInput from './../../elements/TextInput/TextInput';
import { EventType } from '../../elements/TextInput/TextInput';
import InputGroup from '../../elements/InputGroup/InputGroup';
import Errors from '../../elements/Errors/Errors';
import Component = React.Component;

interface State {
  errors: Array<string>;
  isEdited: boolean;
}


class GenericTimeInput extends Component<GenericField.Props, State> {
  private pattern = '^([0-1][0-9]|2[0-3]):([0-5]{2})$';
  private errors = {
    invalid: 'Incorrect Time format, expected hh:mm',
  };

  constructor(props: GenericField.Props) {
    super(props);
    this.state = {
      errors: [],
      isEdited: false,
    };
  }

  componentDidMount() {
    this.validateAndChange('');
  }

  onChange = (event: EventType) => {
    const value: string = (event.nativeEvent.target as HTMLInputElement).value;
    this.validateAndChange(value);
    this.setState((prevState: State) => ({ ...prevState, isEdited: true }));
  }

  validateAndChange = (value: string): void => {
    const errors: string[] = [];

    if (this.props.required && !value.length) {
      errors.push('Field is required');
    } else if (this.props.pattern && !(new RegExp(this.props.pattern)).test(value)) {
      errors.push(this.errors.invalid);
    }

    this.setState({ ...this.state, errors });
    this.props.onChange(value, errors);
  }


  render() {
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
}

export default GenericTimeInput;