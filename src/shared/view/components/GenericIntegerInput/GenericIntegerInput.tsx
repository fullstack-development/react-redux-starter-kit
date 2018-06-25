import * as React from 'react';
import { bind } from 'decko';

import { TextInput } from 'shared/view/elements';
import InputGroup from 'shared/view/elements/InputGroup/InputGroup';

import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';

interface IProps extends GenericFieldProps {
  minimum: number;
  maximum: number;
  isFloat?: boolean;
}

interface IState {
  error: string;
  isEdited: boolean;
}

class GenericIntegerInput extends React.Component<IProps, IState> {

  private errors = {
    required: 'Field is required',
    tooLow: 'Number value is too low',
    tooBig: 'Number value is too big',
    invalid: 'Number value is incorrect',
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      error: '',
      isEdited: false,
    };
  }

  public componentDidMount() {
    const value: string = '';
    const error: string = this.validate(value);
    this.change(value, error);
  }

  public render() {
    const { name, isFloat, label, pattern, placeholder, minimum, maximum } = this.props;
    const { error, isEdited } = this.state;

    return (
      <InputGroup label={label}>
        <TextInput
          name={name}
          type="number"
          placeholder={placeholder}
          onChange={this.onChange}
          inputProps={{
            pattern,
            step: isFloat ? 0.01 : undefined,
            min: minimum,
            max: maximum,
          }}
          error={isEdited && !!error}
          helperText={isEdited && error}
        />
      </InputGroup>
    );
  }

  @bind
  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    const value = (event.nativeEvent.target as HTMLInputElement).value;
    const errors = this.validate(value);
    this.change(value, errors);
    this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
  }

  @bind
  private validate(value: string): string {
    const { isFloat, minimum, maximum, required } = this.props;
    const parsedValue: number = isFloat ? parseFloat(value) : parseInt(value, 10);
    const error = (() => {
      if (required && !value) {
        return this.errors.required;
      } else if (isNaN(parsedValue)) {
        return this.errors.invalid;
      } else {
        if (minimum && parsedValue < minimum) {
          return this.errors.tooLow;
        }
        if (maximum && parsedValue > maximum) {
          return this.errors.tooBig;
        }
      }
      return '';
    })();

    this.setState({ ...this.state, error });

    return error;
  }

  @bind
  private change(value: string, error: string) {
    const handler = this.props.onChange;
    if (handler) {
      handler(value.toString(), error);
    }
  }

}

export default GenericIntegerInput;
