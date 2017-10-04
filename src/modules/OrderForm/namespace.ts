import { IFormProperties } from '../../features/dynamicFields/namespace';

interface IOrderFormRequest {
  attributes: IFormProperties;
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

interface ISaveFields {
  type: 'HOME_MODULE:SAVE_FIELDS';
}

interface ISaveFieldsSuccess {
  type: 'HOME_MODULE:SAVE_FIELDS_SUCCESS';
  payload: IOrderFormResponse;
}

interface ISaveFieldsFail {
  type: 'HOME_MODULE:SAVE_FIELDS_FAIL';
  payload: string;
}

type Action = ISaveFields | ISaveFieldsSuccess | ISaveFieldsFail;

export {
  IOrderFormRequest,
  IOrderFormResponse,
  ICommunication,
  IReduxState,
  ISaveFields,
  ISaveFieldsSuccess,
  ISaveFieldsFail,
  Action,
};
