import * as React from 'react';
import * as block from 'bem-cn'; // default
import { google } from 'google-maps';
import MapOptions = google.maps.MapOptions;
import * as s from './GoogleMap.styl';
import LatLng = google.maps.LatLng;
import GeocoderRequest = google.maps.GeocoderRequest;
import GeocoderResult = google.maps.GeocoderResult;
import GeocoderStatus = google.maps.GeocoderStatus;
import GeocoderAddressComponent = google.maps.GeocoderAddressComponent;

interface Props {
  lat?: number;
  lng?: number;
  showNewPoint: boolean;
  onLocationSelected?: (location: Location) => void;
}

interface Location {
  locality: string;
  area: string;
  point: LatLng | null;
}

class GoogleMap extends React.Component<Props, null> {
  private b = block('google-map');
  private map: google.maps.Map | null;
  private geocoder: google.maps.Geocoder | null;
  private mapContainer: Element;

  public static defaultProps: Props = {
    lat: 6.991815,
    lng: 81.055025,
    showNewPoint: true
  };

  componentWillReceiveProps(nextProps: Props) {
    const isNew: boolean = nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng;
    const isNumbers: boolean = typeof nextProps.lat === 'number' && typeof nextProps.lng === 'number';

    if (isNumbers && isNew && nextProps.showNewPoint) {
      this.setPoint(nextProps.lat as number, nextProps.lng as number);
    }
  }

  setPoint(lat: number, lng: number) {
    const point: LatLng = new LatLng(lat, lng);

    if (this.map !== null) {
      this.map.setCenter(point);
      this.map.setZoom(14);
    }
  }

  componentWillUnmount() {
    this.map = null;
    this.geocoder = null;
  }

  componentDidMount() {
    const lat: number = this.props.lat as number;
    const lng: number = this.props.lng as number;

    const options: MapOptions = {
      center: { lat, lng },
      zoom: 8
    };

    this.geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(this.mapContainer, options);
    this.map.addListener('dragend', this.onDragEnd);

  }

  private onDragEnd = () => {
    if (this.map && this.geocoder) {
      const location: LatLng = this.map.getCenter();
      const request: GeocoderRequest = { location };
      this.geocoder.geocode(request, this.onPlaceDecoded);
    }
  }

  private findAddressComponent(components: GeocoderAddressComponent[], type: string): GeocoderAddressComponent | undefined {
    return components.find(
      (component: GeocoderAddressComponent) => component.types.includes(type)
    );
  }

  private onPlaceDecoded = (results: Array<GeocoderResult> | null, status: GeocoderStatus): void => {
    const result: GeocoderResult | null = results && results.length ? results[0] : null;

    if (result) {
      const locality: GeocoderAddressComponent | undefined = this.findAddressComponent(result.address_components, 'locality');
      const administrativeArea: GeocoderAddressComponent | undefined = this.findAddressComponent(result.address_components, 'administrative_area_level_2');
      const newLocation: Location = {
        locality: locality ? locality.long_name : '',
        area: administrativeArea ? administrativeArea.long_name : '',
        point: this.map ? this.map.getCenter() : null
      };

      const handler = this.props.onLocationSelected;

      if (handler) {
        handler(newLocation);
      }
    }
  }

  private onMapRef = (map: Element) => {
    this.mapContainer = map;
  }

  render() {
    const b = this.b;
    return (
      <div className={s[b()]}>
        <div className={s[b('map')()]} ref={this.onMapRef} />
      </div>
    );
  }
}

export { Props, Location };
export default GoogleMap;