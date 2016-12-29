import * as React from 'react';
import GenericField from '../GenericInput/GenericInput';
import TextInput from './../../elements/TextInput/TextInput';
import { EventType } from '../../elements/TextInput/TextInput';
import InputGroup from '../../elements/InputGroup/InputGroup';
import Errors from '../../elements/Errors/Errors';
import Component = React.Component;

interface IState {
  errors: string[];
  isEdited: boolean;
}

class GenericTimeInput extends Component<GenericField.Props, IState> {
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

  private onChange = (event: EventType) => {
    const value: string = (event.nativeEvent.target as HTMLInputElement).value;
    this.validateAndChange(value);
    this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
  }

  private validateAndChange = (value: string): void => {
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
