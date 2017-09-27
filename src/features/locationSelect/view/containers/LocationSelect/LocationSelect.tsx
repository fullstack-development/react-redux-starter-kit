import * as React from 'react';
import * as block from 'bem-cn';
import * as Select from 'react-select';
import { FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { bind } from 'decko';
import { actions, selectors } from './../../../redux';
import { SelectedLocationData, IReduxState, IArea, ICity } from '../../../namespace';
import GoogleMap, { ILocation as MapLocation } from 'shared/view/components/GoogleMap/GoogleMap';
import SelectInput from 'shared/view/elements/SelectInput/SelectInput';
import './LocationSelect.scss';

interface IOwnProps {
  onChange?: (location: SelectedLocationData) => void;
}

interface IStateProps {
  options: Select.Option[];
  selectedLocation: SelectedLocationData;
  showLocation: boolean;
}

interface IDispatchProps {
  loadCities: typeof actions.loadCities;
  selectLocation: typeof actions.selectLocationByAreaId;
}

type Props = IStateProps & IDispatchProps & IOwnProps;

function mapState(state: any): IStateProps {
  const ownState: IReduxState = selectors.getFeatureState(state);
  const selectedLocation = selectors.selectSelectedLocation(state);

  return {
    options: Object.keys(ownState.data.entities.areas).map<Select.Option>(
      (areaId: string) => {
        const area: IArea = ownState.data.entities.areas[parseInt(areaId, 10)];
        return { label: area.displayName, value: area.id };
      },
    ),
    selectedLocation: selectedLocation !== null ? {
      point: selectedLocation.point,
      area: selectors.selectAreaById(state, selectedLocation.area),
      city: selectors.selectCityById(state, selectedLocation.city),
    } : null,
    showLocation: ownState.ui.showSelectedLocation,
  };
}

function mapDispatch(dispatch: Dispatch<any>): IDispatchProps {
  return bindActionCreators({
    loadCities: actions.loadCities,
    selectLocation: actions.selectLocationByAreaId,
  }, dispatch);
}

class LocationSelect extends React.Component<Props, {}> {
  private b = block('location-select');

  constructor(props: Props) {
    super(props);
  }

  public componentWillReceiveProps(nextProps: Props) {
    const { onChange } = this.props;
    // notify subscribed components (if they are exist), if selected location changed
    if (nextProps.selectedLocation !== this.props.selectedLocation) {
      if (onChange) {
        onChange(nextProps.selectedLocation);
      }
    }
  }

  public componentDidMount() {
    this.props.loadCities();
  }

  public render() {
    interface IRenderData {
      options: Select.Option[];
      selectedLocation: SelectedLocationData;
    }

    const b = this.b;
    const { options, selectedLocation }: IRenderData = this.props;
    const selectedArea: IArea | null = selectedLocation ? selectedLocation.area : null;
    const selectedCity: ICity | null = selectedLocation ? selectedLocation.city : null;
    const showSelectedAreaOnMap: boolean = this.props.showLocation;

    return (
      <div className={b()}>
        <div className={b('form')()}>
          <label className={b('label')()}><b>Location:</b></label>
          <SelectInput
            className={b('input')()}
            options={options}
            value={selectedArea ? selectedArea.id : ''}
            onChange={this.onSelectLocation}
          />
          <FormControl
            value={selectedArea ? selectedArea.name : ''}
            className={b('input')()}
            type="text"
            placeholder="Area"
            disabled
          />
          <FormControl
            className={b('input')()}
            value={selectedCity ? selectedCity.name : ''}
            type="text"
            placeholder="City"
            disabled
          />
        </div>
        <div className={b('map')()}>
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

  @bind
  private onSelectLocation(item: Select.Option | null) {
    if (item === null) {
      this.props.selectLocation(null, false);
    } else {
      this.props.selectLocation({ areaId: item.value as number, point: null }, true);
    }
  }

  @bind
  private onSelectMapLocation(location: MapLocation) {
    const selectedAreaName: string = `${location.locality}, ${location.area}`;
    const areas = this.props.options;

    const selectedAreaOption: Select.Option | undefined =
      areas.find((area: Select.Option) => area.label === selectedAreaName);

    if (selectedAreaOption) {
      const point = location.point ? { lat: location.point.lat(), lng: location.point.lng() } : null;
      this.props.selectLocation({ areaId: selectedAreaOption.value as number, point }, false);
    } else {
      this.props.selectLocation(null, false);
    }
  }
}

export { Props };
export default connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(LocationSelect);
