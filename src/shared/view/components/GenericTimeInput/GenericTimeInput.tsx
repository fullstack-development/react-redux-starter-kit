import * as React from 'react';
import { bind } from 'decko';

import { TextInput } from '../../elements';
import InputGroup from '../../elements/InputGroup/InputGroup';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';

import Component = React.Component;

interface IState {
  error: string;
  isEdited: boolean;
}

class GenericTimeInput extends Component<GenericFieldProps, IState> {
  private errors = {
    invalid: 'Incorrect Time format, expected hh:mm',
  };

  constructor(props: GenericFieldProps) {
    super(props);
    this.state = {
      error: '',
      isEdited: false,
    };
  }

  public componentDidMount() {
    this.validateAndChange('');
  }

  public render() {
    const { name, label, placeholder } = this.props;
    const { error, isEdited } = this.state;

    return (
      <InputGroup label={label}>
        <TextInput
          type="time"
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
  private onChange(event: React.FormEvent<HTMLInputElement>) {
    const value: string = (event.nativeEvent.target as HTMLInputElement).value;
    this.validateAndChange(value);
    this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
  }

  @bind
  private validateAndChange(value: string): void {
    const { required, onChange, pattern } = this.props;
    const error: string = (() => {
      if (required && !value.length) {
        return 'Field is required';
      } else if (pattern && !(new RegExp(pattern)).test(value)) {
        return this.errors.invalid;
      }
      return '';
    })();

    this.setState({ ...this.state, error });

    if (onChange) {
      onChange(value, error);
    }
  }
}

export default GenericTimeInput;
