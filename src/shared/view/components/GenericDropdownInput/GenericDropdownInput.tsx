import * as React from 'react';
import * as Select from 'react-select'; // default
import Errors from 'shared/view/elements/Errors/Errors';
import GenericField from '../GenericInput/GenericInput';
import SelectInput from '../../elements/SelectInput/SelectInput';
import InputGroup from './../../elements/InputGroup/InputGroup';

interface State {
  errors: string[];
  selected: Select.Option | null;
  isEdited: boolean;
}

class GenericDropdownInput extends React.Component<GenericField.Props, State> {
  constructor(props: GenericField.Props) {
    super(props);
    this.state = {
      errors: [],
      selected: null,
      isEdited: false
    };
  }

  componentDidMount() {
    this.validateAndChangeValue(null); // first changing with validation, but without showing errors
  }

  onSelect = (selected: Select.Option | null) => {
    this.validateAndChangeValue(selected);
    this.setState((prevState: State) => ({ ...prevState, isEdited: true }));
  }

  validateAndChangeValue(selected: Select.Option | null) {
    const errors = [];

    if (!selected && this.props.required) {
      errors.push('Field is required');
    }

    if (selected) {
      if (typeof selected.value === 'string' || typeof selected.value === 'number') {
        // Type Guards allow you to narrow down the type of an object within a conditional block.
        // TypeScript is aware of the usage of the JavaScript instanceof and typeof operators
        // Read "Type Guards and Differentiating Types" of Typescript's docs
        this.props.onChange(selected.value, errors);
      }
    } else {
      this.props.onChange('', errors);
    }

    this.setState({
      ...this.state,
      selected,
      errors
    });
  }

  render() {
    const { name, label, 'enum': options } = this.props;
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
}

export default GenericDropdownInput;
