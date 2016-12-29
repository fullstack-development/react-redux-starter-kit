import { FormProperties } from '../../features/dynamicFields/namespace';

interface IOrderFormRequest {
  attributes: FormProperties;
  notify: boolean;
  description: string;
  location: number;  // area id only - don't need a city id
  category: number;
  coord_from_lng: number;
  coord_from_lat: number;
  coord_to_lng: number;
  coord_to_lat: number;
}

interface IOrderFormResponse {
  message: string;
}

interface ICommunication {
  isRequesting: boolean;
  error: string;
}

interface IReduxState {
  communications: {
    saving: ICommunication;
  };
  data: { message: string; } | null;
}

export {
  IOrderFormRequest,
  IOrderFormResponse,
  ICommunication,
  IReduxState,
};
