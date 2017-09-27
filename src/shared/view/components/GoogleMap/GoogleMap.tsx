import * as React from 'react';
import * as block from 'bem-cn';
import { bind } from 'decko';
import MapOptions = google.maps.MapOptions;
import './GoogleMap.scss';

type GCRequest = google.maps.GeocoderRequest;
type GCResult = google.maps.GeocoderResult;
type GCAddressComponent = google.maps.GeocoderAddressComponent;

interface IProps {
  lat?: number;
  lng?: number;
  showNewPoint: boolean;
  onLocationSelected?: (location: ILocation) => void;
}

interface ILocation {
  locality: string;
  area: string;
  point: google.maps.LatLng | null;
}

class GoogleMap extends React.Component<IProps> {
  public static defaultProps: IProps = {
    lat: 6.991815,
    lng: 81.055025,
    showNewPoint: true,
  };
  private b = block('google-map');
  private map: google.maps.Map | null;
  private geocoder: google.maps.Geocoder | null;
  private mapContainer: HTMLDivElement | null;

  public componentWillReceiveProps(nextProps: IProps) {
    const isNew: boolean = nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng;
    const isNumbers: boolean = typeof nextProps.lat === 'number' && typeof nextProps.lng === 'number';

    if (isNumbers && isNew && nextProps.showNewPoint) {
      this.setPoint(nextProps.lat as number, nextProps.lng as number);
    }
  }

  public setPoint(lat: number, lng: number) {
    const point: google.maps.LatLng = new google.maps.LatLng(lat, lng);

    if (this.map !== null) {
      this.map.setCenter(point);
      this.map.setZoom(14);
    }
  }

  public componentWillUnmount() {
    this.map = null;
    this.geocoder = null;
  }

  public componentDidMount() {
    const lat: number = this.props.lat as number;
    const lng: number = this.props.lng as number;

    const options: MapOptions = {
      center: { lat, lng },
      zoom: 8,
    };

    this.geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(this.mapContainer, options);
    this.map.addListener('dragend', this.onDragEnd);
  }

  public render() {
    const b = this.b;
    return (
      <div className={b()}>
        <div className={b('map')()} ref={this.onMapRef} />
      </div>
    );
  }

  @bind
  private onDragEnd() {
    if (this.map && this.geocoder) {
      const location: google.maps.LatLng = this.map.getCenter();
      const request: GCRequest = { location };
      this.geocoder.geocode(request, this.onPlaceDecoded);
    }
  }

  private findAddressComponent(components: GCAddressComponent[], type: string): GCAddressComponent | undefined {
    return components.find(
      (component: GCAddressComponent) => component.types.includes(type),
    );
  }

  @bind
  private onPlaceDecoded(results: GCResult[] | null): void {
    const result: GCResult | null = results && results.length ? results[0] : null;

    if (result) {
      const locality: GCAddressComponent | undefined = this.findAddressComponent(
        result.address_components,
        'locality',
      );
      const administrativeArea: GCAddressComponent | undefined = this.findAddressComponent(
        result.address_components,
        'administrative_area_level_2',
      );
      const newLocation: ILocation = {
        locality: locality ? locality.long_name : '',
        area: administrativeArea ? administrativeArea.long_name : '',
        point: this.map ? this.map.getCenter() : null,
      };

      const handler = this.props.onLocationSelected;

      if (handler) {
        handler(newLocation);
      }
    }
  }

  @bind
  private onMapRef(map: HTMLDivElement | null) {
    this.mapContainer = map;
  }
}

export { IProps, ILocation };
export default GoogleMap;
