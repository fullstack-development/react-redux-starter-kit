import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { bind } from 'decko';
import { Typography } from '@material-ui/core';

import { IAppReduxState } from 'shared/types/app';
import { ILocation, IArea, ICity } from 'shared/types/models';
import { SelectInput, Option, TextInput } from 'shared/view/elements';
import GoogleMap, { ILocation as MapLocation } from 'shared/view/components/GoogleMap/GoogleMap';

import { IReduxState } from '../../../namespace';
import { actions, selectors } from './../../../redux';
import { StylesProps, provideStyles } from './LocationSelect.style';

interface IOwnProps {
  onChange?(location: ILocation | null): void;
}

interface IStateProps {
  options: Option[];
  selectedLocation: ILocation | null;
  showLocation: boolean;
}

interface IDispatchProps {
  loadCities: typeof actions.loadCities;
  selectLocation: typeof actions.selectLocationByAreaId;
}

type Props = IStateProps & IDispatchProps & IOwnProps & StylesProps;

function mapState(state: IAppReduxState): IStateProps {
  const ownState: IReduxState = selectors.getFeatureState(state);
  const selectedLocation = selectors.selectSelectedLocation(state);

  return {
    options: Object.keys(ownState.data.entities.areas).map<Option>(
      (areaId: string) => {
        const area: IArea = ownState.data.entities.areas[parseInt(areaId, 10)];
        return { label: area.displayName, value: area.id };
      },
    ),
    selectedLocation: selectedLocation && {
      point: selectedLocation.point,
      area: selectors.selectAreaById(state, selectedLocation.area),
      city: selectors.selectCityById(state, selectedLocation.city),
    },
    showLocation: ownState.ui.showSelectedLocation,
  };
}

function mapDispatch(dispatch: Dispatch): IDispatchProps {
  return bindActionCreators({
    loadCities: actions.loadCities,
    selectLocation: actions.selectLocationByAreaId,
  }, dispatch);
}

class LocationSelect extends React.Component<Props> {
  public componentDidUpdate(prevProps: Props) {
    const { onChange } = this.props;
    // notify subscribed components (if they are exist), if selected location changed
    if (this.props.selectedLocation !== prevProps.selectedLocation) {
      if (onChange) {
        onChange(this.props.selectedLocation);
      }
    }
  }

  public componentDidMount() {
    this.props.loadCities();
  }

  public render() {
    const { options, selectedLocation, classes } = this.props;
    const selectedArea: IArea | null = selectedLocation ? selectedLocation.area : null;
    const selectedCity: ICity | null = selectedLocation ? selectedLocation.city : null;
    const showSelectedAreaOnMap: boolean = this.props.showLocation;

    return (
      <div>
        <div className={classes.form}>
          <Typography component="label" variant="subheading" className={classes.label}><b>Location:</b></Typography>
          <div className={classes.input}>
            <SelectInput
              options={options}
              value={selectedArea ? selectedArea.id : ''}
              onChange={this.onSelectLocation}
            />
          </div>
          <div className={classes.input}>
            <TextInput
              value={selectedArea ? selectedArea.name : ''}
              placeholder="Area"
              disabled
            />
          </div>
          <div className={classes.input}>
            <TextInput
              value={selectedCity ? selectedCity.name : ''}
              placeholder="City"
              disabled
            />
          </div>
        </div>
        <div className={classes.map}>
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
  private onSelectLocation(item: Option | null) {
    if (!item) {
      this.props.selectLocation({ showOnMap: false });
    } else {
      this.props.selectLocation({
        location: {
          areaID: +(item.value || 0),
        },
        showOnMap: true,
      });
    }
  }

  @bind
  private onSelectMapLocation(location: MapLocation) {
    const selectedAreaName: string = `${location.locality}, ${location.area}`;
    const areas = this.props.options;

    const selectedAreaOption: Option | undefined =
      areas.find((area: Option) => area.label === selectedAreaName);

    if (selectedAreaOption) {
      const point = location.point ? { lat: location.point.lat(), lng: location.point.lng() } : undefined;
      this.props.selectLocation({
        location: { areaID: selectedAreaOption.value as number, point },
        showOnMap: false,
      });
    } else {
      this.props.selectLocation({ showOnMap: false });
    }
  }
}

export { Props };
export default (
  connect(mapState, mapDispatch)(
    provideStyles(LocationSelect),
  )
);
