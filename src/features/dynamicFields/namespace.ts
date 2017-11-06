import { IFields, IFormProperties } from 'shared/types/models';
import { ICommunication } from 'modules/OrderForm/namespace';

interface IReduxState {
  communications: {
    fetching: ICommunication;
  };
  data: {
    fields: IFields;
    values: IFormProperties;
  };
}

export { IReduxState };
