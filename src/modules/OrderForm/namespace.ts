import { IFlatFormProperties, ILocationProperties, INormalizedLocation } from 'shared/types/models';
import { ICommunication, IAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communications: {
    saving: ICommunication;
  };
  data: {
    message: string | null;
  };
}

export interface ISaveFieldsRequest {
  chosenLocation: INormalizedLocation | null;
  chosenCategoryUid: number | null;
  dynamicValues: IFlatFormProperties;
  locationValues: ILocationProperties;
}

export interface ISaveFieldsResponse {
  message: string;
}

export type ISaveFields = IAction<'ORDER_FORM_MODULE:SAVE_FIELDS', ISaveFieldsRequest>;
export type ISaveFieldsSuccess = IAction<'ORDER_FORM_MODULE:SAVE_FIELDS_SUCCESS', ISaveFieldsResponse>;
export type ISaveFieldsFail = IPlainFailAction<'ORDER_FORM_MODULE:SAVE_FIELDS_FAIL'>;

export type Action = ISaveFields | ISaveFieldsSuccess | ISaveFieldsFail;
