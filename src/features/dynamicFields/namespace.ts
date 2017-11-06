import { IGeosuggestOption } from 'shared/view/components/GenericLocationInput/GenericLocationInput';
import { IFields } from 'shared/types/models';

interface IFormProperties {
  [key: string]: string | number | IGeosuggestOption;
}

interface ILocationProperties {
  [key: string]: { lat: number; lng: number; };
  from: { lat: number; lng: number; };
  to: { lat: number; lng: number; };
}

interface ICommunication {
  isRequesting: boolean;
  error: string;
}

interface IReduxState {
  communications: {
    fetching: ICommunication;
  };
  data: {
    fields: IFields;
    values: IFormProperties;
  };
}

export {
  IFormProperties,
  ILocationProperties,
  ICommunication,
  IReduxState,
};
