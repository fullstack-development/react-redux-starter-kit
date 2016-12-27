import * as React from 'react';
import { Radio, FormGroup } from 'react-bootstrap';
import Errors from 'shared/view/elements/Errors/Errors';
import * as block from 'bem-cn'; // default
import * as s from './GenericRadioInput.styl';
import GenericField from '../GenericInput/GenericInput';
import InputGroup from './../../elements/InputGroup/InputGroup';

interface State {
  errors: string[];
  isEdited: boolean;
}

class GenericRadioInput extends React.Component<GenericField.Props, State> {
  private b = block('generic-radio-input');

  constructor(props: GenericField.Props) {
    super(props);
    this.state = {
      errors: [],
      isEdited: false,
    };
  }

  componentDidMount() {
    this.validateAndChange('', '');
  }

  onChange = (fieldName: string, value: string): () => void => {
    return () => {
      this.validateAndChange(fieldName, value);
      this.setState((prevState: State) => ({ ...prevState, isEdited: true }));
    };
  }

  validateAndChange = (fieldName: string, value: string): void => {
    const errors: string[] = [];

    if (this.props.required && !value.length) {
      errors.push('Field is required');
    }

    this.setState({ ...this.state, errors });

    this.props.onChange(value, errors);
  }

  render() {
    const b = this.b;
    const { name, label, 'enum': options } = this.props;
    const { errors, isEdited } = this.state;

    return (
     <InputGroup label={label}>
        <FormGroup className={s[b('radios-group')]}>
          {
            options.map((option: string, index: number) => (
                <Radio
                  inline
                  key={index}
                  name={name}
                  className={s[b('radio-button')()]}
                  onChange={this.onChange(name, option)}
                >
                  {option}
                </Radio>
              )
            )
          }
        </FormGroup>
        <Errors errors={this.props.errors ? errors.concat(this.props.errors) : errors} hidden={!isEdited} />
     </InputGroup>
    );
  }
}

export default GenericRadioInput;