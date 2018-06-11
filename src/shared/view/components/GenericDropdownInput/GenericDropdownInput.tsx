import * as React from 'react';
import { bind } from 'decko';

import { isNumber, isString } from 'shared/types/guards';

import { SelectInput, Option } from '../../elements';
import InputGroup from '../../elements/InputGroup/InputGroup';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';

interface IState {
  error: string;
  selected: Option<string> | null;
  isEdited: boolean;
}

class GenericDropdownInput extends React.PureComponent<GenericFieldProps, IState> {
  constructor(props: GenericFieldProps) {
    super(props);
    this.state = {
      error: '',
      selected: null,
      isEdited: false,
    };
  }

  public componentDidMount() {
    this.validateAndChangeValue(null); // first changing with validation, but without showing errors
  }

  public render() {
    const { name, label, 'enum': options = [] } = this.props;
    const { selected, isEdited } = this.state;

    const error = this.props.error || this.state.error;

    const dropdownOptions = options.map<Option<string>>(option => ({
      label: option,
      value: option,
    }));

    return (
      <InputGroup label={label}>
        <SelectInput
          name={name}
          options={dropdownOptions}
          onChange={this.onSelect}
          value={selected && selected.value || ''}
          error={isEdited && !!error}
          helperText={isEdited && error}
        />
      </InputGroup>
    );
  }

  @bind
  private onSelect(selected: Option<string> | null) {
    this.validateAndChangeValue(Array.isArray(selected) ? selected[0] : selected);
    this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
  }

  private validateAndChangeValue(selected: Option<string> | null) {
    const { required, onChange } = this.props;
    const error = !selected && required ? 'Field is required' : '';

    if (onChange) {
      const value: string | number =
        selected && (isNumber(selected.value) || isString(selected.value))
          ? selected.value
          : '';
      onChange(value, error);
    }

    this.setState({ ...this.state, selected, error });
  }

}

export default GenericDropdownInput;
