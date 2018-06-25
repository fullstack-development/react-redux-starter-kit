import * as React from 'react';
import Geosuggest from 'react-geosuggest';
import { bind } from 'decko';
import { FormHelperText } from '@material-ui/core';

import InputGroup from '../../elements/InputGroup/InputGroup';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';

interface IGeosuggestOption {
  label: string;
  placeId?: string;
  location?: {
    lat: number;
    lng: number;
  };
  gmaps?: {
    address_components: object[];
    formatted_address: string;
    // few other fields; check this https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult
  };
}

interface IState {
  error: string;
  isEdited: boolean;
}

function isGeosuggestOption(item: IGeosuggestOption | any): item is IGeosuggestOption {
  return item.label && typeof item.label === 'string';
}

class GenericLocationInput extends React.Component<GenericFieldProps, IState> {
  constructor(props: GenericFieldProps) {
    super(props);
    this.state = {
      error: '',
      isEdited: false,
    };
  }

  public componentDidMount() {
    this.validateAndChange({ label: '' });
  }

  public render() {
    const { placeholder, label } = this.props;
    const { error, isEdited } = this.state;
    const sriLankaLatLng = new google.maps.LatLng(7.75000, 80.76667);

    return (
      <InputGroup label={label}>
        <Geosuggest
          placeholder={placeholder}
          location={sriLankaLatLng}
          queryDelay={1000}
          radius="330"
          inputClassName="form-control"
          onSuggestSelect={this.onSelect}
        />
        {isEdited && !!error && <FormHelperText error>{error}</FormHelperText>}
      </InputGroup>
    );
  }

  @bind
  private onSelect(selected: IGeosuggestOption) {
    this.validateAndChange(selected);
    this.setState((prevState: IState) => ({ ...prevState, isEdited: true }));
  }

  @bind
  private validateAndChange(value: IGeosuggestOption) {
    const { onChange, required } = this.props;
    const error: string = required && (!value.label || !value.placeId) ? 'Field is required' : '';

    if (onChange) {
      onChange(value, error);
    }

    this.setState({ ...this.state, error });
  }
}

export { IGeosuggestOption, isGeosuggestOption };
export default GenericLocationInput;
