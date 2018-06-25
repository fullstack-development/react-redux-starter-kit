import * as React from 'react';
import { bind } from 'decko';

import { TextInput } from '../../elements';
import InputGroup from '../../elements/InputGroup/InputGroup';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';

type IProps = GenericFieldProps;
interface IState {
  error: string;
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
      error: '',
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
    const { error, isEdited } = this.state;

    return (
      <InputGroup label={label}>
        <TextInput
          type="date"
          name={name}
          placeholder={placeholder}
          onChange={this.onChange}
          inputProps={{ pattern }}
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
  private validateAndChange(rawValue: string): void {
    const { pattern, required, onChange } = this.props;
    const value: string = new RegExp(this.standardHTMLpattern).test(rawValue)
      // current browser support date inputs
      ? rawValue.split('-').reverse().join('-')
      : rawValue;
    const error: string = (() => {
      if (pattern && !(new RegExp(pattern)).test(value)) {
        return this.errors.invalid;
      }
      if (required && !value.length) {
        return this.errors.required;
      }
      return '';
    })();

    this.setState({ ...this.state, error });

    if (onChange) {
      onChange(value, error);
    }
  }
}

export { IProps, IState };
export default GenericDateInput;
