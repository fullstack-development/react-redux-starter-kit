import * as React from 'react';
import Geosuggest from 'react-geosuggest';
import GenericField from '../GenericInput/GenericInput';
import InputGroup from './../../elements/InputGroup/InputGroup';
import Errors from '../../elements/Errors/Errors';

interface GeosuggestOption {
  label: string;
  placeId?: string;
  location?: {
    lat: number;
    lng: number;
  };
  gmaps?: {
    address_components: Array<Object>;
    formatted_address: string;
    // few other fields; check this https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult
  };
}

interface State {
  errors: string[];
  isEdited: boolean;
}

function isGeosuggestOption(item: GeosuggestOption | any): item is GeosuggestOption {
  return item.label && typeof item.label === 'string';
}

class GenericLocationInput extends React.Component<GenericField.Props, State> {
  constructor(props: GenericField.Props) {
    super(props);
    this.state = {
      errors: [],
      isEdited: false,
    };
  }

  componentDidMount() {
    this.validateAndChange({ label: '' });
  }

  onSelect = (selected: GeosuggestOption) => {
    this.validateAndChange(selected);
    this.setState((prevState: State) => ({ ...prevState, isEdited: true }));
  }

  validateAndChange = (value: GeosuggestOption) => {
    const errors: string[] = [];

    if (this.props.required && (!value.label || !value.placeId)) {
      errors.push('Field is required');
    }

    this.props.onChange(value, errors);
    this.setState({ ...this.state, errors });
  }

  render() {
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
}

export { GeosuggestOption, isGeosuggestOption }
export default GenericLocationInput;
