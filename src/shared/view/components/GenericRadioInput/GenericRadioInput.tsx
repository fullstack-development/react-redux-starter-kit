import * as React from 'react';
import { bind } from 'decko';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import InputGroup from '../../elements/InputGroup/InputGroup';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';

interface IState {
  error: string;
  isEdited: boolean;
  value: string;
}

class GenericRadioInput extends React.Component<GenericFieldProps, IState> {
  constructor(props: GenericFieldProps) {
    super(props);
    this.state = {
      error: '',
      isEdited: false,
      value: '',
    };
  }

  public componentDidMount() {
    if (this.props.required) {
      this.setState({ error: 'Field is required' });
    }
  }

  public render() {
    const { name = '', label, enum: options } = this.props;
    const { error, isEdited, value } = this.state;

    return (
      <InputGroup label={label}>
        <RadioGroup
          row
          name={name}
          value={value}
          onChange={this.onChange}
        >
          {options
            ? options.map((option: string, index: number) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))
            : 'No choices'
          }
        </RadioGroup>
        {isEdited && !!error && <FormHelperText error>{error}</FormHelperText>}
      </InputGroup>
    );
  }

  @bind
  private onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { required, onChange } = this.props;
    const { value } = event.target;
    const error: string = required && !value.length ? 'Field is required' : '';

    this.setState({ isEdited: true, error, value });

    if (onChange) {
      onChange(value, error);
    }
  }

}

export default GenericRadioInput;
