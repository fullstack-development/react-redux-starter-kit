import * as React from 'react';
import * as Select from 'react-select';
import { bind } from 'decko';
import Errors from 'shared/view/elements/Errors/Errors';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';
import SelectInput from '../../elements/SelectInput/SelectInput';
import InputGroup from './../../elements/InputGroup/InputGroup';

interface IState {
  errors: string[];
  selected: Select.Option | null;
  isEdited: boolean;
}

class GenericDropdownInput extends React.PureComponent<GenericFieldProps, IState> {
  constructor(props: GenericFieldProps) {
    super(props);
    this.state = {
      errors: [],
      selected: null,
      isEdited: false,
    };
  }

  public componentDidMount() {
    this.validateAndChangeValue(null); // first changing with validation, but without showing errors
  }

  public render() {
    const { name, label, 'enum': options = [] } = this.props;
    const { errors, selected, isEdited } = this.state;

    const dropdownOptions = options.map<Select.Option>(option => ({
      label: option,
      value: option,
    }));

    return (
      <InputGroup label={label}>
        <SelectInput
          name={name}
          options={dropdownOptions}
          onChange={this.onSelect}
          value={selected ? selected : ''}
        />
        <Errors errors={this.props.errors ? errors.concat(this.props.errors) : errors} hidden={!isEdited} />
      </InputGroup>
    );
  }

  @bind
  private onSelect(selected: Select.Option | Select.Option[] | null) {
    this.validateAndChangeValue(Array.isArray(selected) ? selected[0] : selected);
    this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
  }

  private validateAndChangeValue(selected: Select.Option | null) {
    const { required, onChange } = this.props;
    const errors = [];
    let value: string | number = '';

    if (!selected && required) {
      errors.push('Field is required');
    }

    if (selected) {
      if (typeof selected.value === 'string' || typeof selected.value === 'number') {
        // Type Guards allow you to narrow down the type of an object within a conditional block.
        // TypeScript is aware of the usage of the JavaScript instanceof and typeof operators
        // Read "Type Guards and Differentiating Types" of Typescript's docs
        value = selected.value;
      }
    }

    if (onChange) {
      onChange(value, errors);
    }

    this.setState({
      ...this.state,
      selected,
      errors,
    });
  }

}

export default GenericDropdownInput;
