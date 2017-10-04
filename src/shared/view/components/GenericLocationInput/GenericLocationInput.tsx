import * as React from 'react';
import Geosuggest from 'react-geosuggest';
import { bind } from 'decko';
import { IProps as GenericFieldProps } from '../GenericInput/GenericInput';
import InputGroup from './../../elements/InputGroup/InputGroup';
import Errors from '../../elements/Errors/Errors';

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
  errors: string[];
  isEdited: boolean;
}

function isGeosuggestOption(item: IGeosuggestOption | any): item is IGeosuggestOption {
  return item.label && typeof item.label === 'string';
}

class GenericLocationInput extends React.Component<GenericFieldProps, IState> {
  constructor(props: GenericFieldProps) {
    super(props);
    this.state = {
      errors: [],
      isEdited: false,
    };
  }

  public componentDidMount() {
    this.validateAndChange({ label: '' });
  }

  public render() {
    const { placeholder, label } = this.props;
    const { errors, isEdited } = this.state;
    const shriLankaLatLng = new google.maps.LatLng(7.75000, 80.76667);

    return (
      <InputGroup label={label}>
        <Geosuggest
          placeholder={placeholder}
          location={shriLankaLatLng}
          queryDelay={1000}
          radius="330"
          inputClassName="form-control"
          onSuggestSelect={this.onSelect}
        />
        <Errors errors={this.props.errors ? errors.concat(this.props.errors) : errors} hidden={!isEdited} />
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
    const errors: string[] = [];

    if (required && (!value.label || !value.placeId)) {
      errors.push('Field is required');
    }

    if (onChange) {
      onChange(value, errors);
    }

    this.setState({ ...this.state, errors });
  }
}

export { IGeosuggestOption, isGeosuggestOption };
export default GenericLocationInput;
