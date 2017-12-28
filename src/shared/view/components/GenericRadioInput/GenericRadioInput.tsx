import * as React from 'react';
import { Radio, FormGroup } from 'react-bootstrap';
import { bind } from 'decko';
import block from 'bem-cn';
import Errors from 'shared/view/elements/Errors/Errors';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';
import InputGroup from './../../elements/InputGroup/InputGroup';
import './GenericRadioInput.scss';

interface IState {
  errors: string[];
  isEdited: boolean;
}

class GenericRadioInput extends React.Component<GenericFieldProps, IState> {
  private b = block('generic-radio-input');

  constructor(props: GenericFieldProps) {
    super(props);
    this.state = {
      errors: [],
      isEdited: false,
    };
  }

  public componentDidMount() {
    this.validateAndChange('', '');
  }

  public render() {
    const b = this.b;
    const { name = '', label, 'enum': options } = this.props;
    const { errors, isEdited } = this.state;

    return (
     <InputGroup label={label}>
        <FormGroup className={b('radios-group')()}>
          {
            options ? options.map((option: string, index: number) => (
                <Radio
                  inline
                  key={index}
                  name={name}
                  className={b('radio-button')()}
                  onChange={this.onChange(name, option)}
                >
                  {option}
                </Radio>
              ),
            ) : 'No choices'
          }
        </FormGroup>
        <Errors errors={this.props.errors ? errors.concat(this.props.errors) : errors} hidden={!isEdited} />
     </InputGroup>
    );
  }

  @bind
  private onChange(fieldName: string, value: string): () => void {
    return () => {
      this.validateAndChange(fieldName, value);
      this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
    };
  }

  @bind
  private validateAndChange(fieldName: string, value: string): void {
    const { required, onChange } = this.props;
    const errors: string[] = [];

    if (required && !value.length) {
      errors.push('Field is required');
    }

    this.setState({ ...this.state, errors });

    if (onChange) {
      onChange(value, errors);
    }
  }

}

export default GenericRadioInput;
