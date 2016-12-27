import * as React from 'react';
import * as block from 'bem-cn'; // default
import * as Select from 'react-select'; // default
import { FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { actions, selectors } from './../../../redux';
import Namespace from '../../../namespace';
import GoogleMap, { Location as MapLocation } from 'shared/view/components/GoogleMap/GoogleMap';
import SelectInput from 'shared/view/elements/SelectInput/SelectInput';
import * as s from './LocationSelect.styl'; // default

interface OwnProps {
  onChange?: (location: Namespace.SelectedLocationData) => void;
}

interface StateProps {
  options: Array<Select.Option>;
  selectedLocation: Namespace.SelectedLocationData;
  showLocation: boolean;
}

interface DispatchProps {
  loadCities: typeof actions.loadCities;
  selectLocation: typeof actions.selectLocationByAreaId;
}

interface Props extends StateProps, DispatchProps, OwnProps {}

function mapState(state: any): StateProps {
  const ownState: Namespace.InitialState = selectors.getFeatureState(state);
  const selectedLocation = selectors.selectSelectedLocation(state);

  return {
    options: Object.keys(ownState.data.entities.areas).map<Select.Option>(
      (areaId: string) => {
        const area: Namespace.Area = ownState.data.entities.areas[parseInt(areaId)];
        return { label: area.displayName, value: area.id };
      }
    ),
    selectedLocation: selectedLocation !== null ? {
      point: selectedLocation.point,
      area: selectors.selectAreaById(state, selectedLocation.area),
      city: selectors.selectCityById(state, selectedLocation.city),
    } : null,
    showLocation: ownState.ui.showSelectedLocation
  };
}

function mapDispatch(dispatch: Dispatch<any>): DispatchProps {
  return bindActionCreators({
    loadCities: actions.loadCities,
    selectLocation: actions.selectLocationByAreaId
  }, dispatch);
}

class LocationSelect extends React.Component<Props, {}> {
  private b = block('location-select');

  constructor(props: Props) {
    super(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { onChange } = this.props;
    // notify subscribed components (if they are exist), if selected location changed
    if (nextProps.selectedLocation !== this.props.selectedLocation) {
      if (onChange) {
        onChange(nextProps.selectedLocation);
      }
    }
  }

  componentDidMount() {
    this.props.loadCities();
  }

  onSelectLocation = (item: Select.Option | null) => {
    if (item === null) {
      this.props.selectLocation(null, false);
    } else {
      this.props.selectLocation({ areaId: item.value as number, point: null }, true);
    }
  }

  private onSelectMapLocation = (location: MapLocation) => {
    const selectedAreaName: string = `${location.locality}, ${location.area}`;
    const areas = this.props.options;

    const selectedAreaOption: Select.Option | undefined =
      areas.find((area: Select.Option) => area.label === selectedAreaName);

    if (selectedAreaOption) {
      const point = location.point ? { lat: location.point.lat(), lng: location.point.lng() } : null;
      this.props.selectLocation({ areaId: selectedAreaOption.value as number, point: point }, false);
    } else {
      this.props.selectLocation(null, false);
    }
  }

  render() {
    interface RenderData {
      options: Array<Select.Option>;
      selectedLocation: Namespace.SelectedLocationData;
    }

    const b = this.b;
    const { options, selectedLocation }: RenderData = this.props;
    const selectedArea: Namespace.Area | null = selectedLocation ? selectedLocation.area : null;
    const selectedCity: Namespace.City | null = selectedLocation ? selectedLocation.city : null;
    const showSelectedAreaOnMap: boolean = this.props.showLocation;

    return (
      <div className={s[b()]}>
        <div className={s[b('form')]}>
          <label className={s[b('label')()]}><b>Location:</b></label>
          <SelectInput
            className={s[b('input')()]}
            options={options}
            value={selectedArea ? selectedArea.id : ''}
            onChange={this.onSelectLocation}
          />
          <FormControl
            value={selectedArea ? selectedArea.name : ''}
            className={s[b('input')()]}
            type="text"
            placeholder="Area"
            disabled
          />
          <FormControl
            className={s[b('input')()]}
            value={selectedCity ? selectedCity.name : ''}
            type="text"
            placeholder="City"
            disabled
          />
        </div>
        <div className={s[b('map')()]}>
          <GoogleMap
            lat={selectedArea ? selectedArea.point.lat : undefined}
            lng={selectedArea ? selectedArea.point.lng : 0}
            showNewPoint={showSelectedAreaOnMap}
            onLocationSelected={this.onSelectMapLocation}
          />
        </div>
      </div>
    );
  }
}

export { Props };
export default connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(LocationSelect);