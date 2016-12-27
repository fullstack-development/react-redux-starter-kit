import DynamicFields from '../../features/dynamicFields/namespace';

declare namespace HomeModule {
  interface OrderFormRequest {
    attributes: DynamicFields.FormProperties;
    notify: boolean;
    description: string;
    location: number;  // area id only - don't need a city id
    category: number;
    coord_from_lng: number;
    coord_from_lat: number;
    coord_to_lng: number;
    coord_to_lat: number;
  }

  interface OrderFormResponse {
    message: string;
  }

  interface Communication {
    isRequesting: boolean;
    error: string;
  }

  interface InitialState {
    communications: {
      saving: Communication
    };
    data: {
      message: string;
    } | null;
  }
}

export default HomeModule;