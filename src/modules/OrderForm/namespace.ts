import { IFlatFormProperties, ILocationProperties, INormalizedLocation } from 'shared/types/models';
import { ICommunication, IAction } from 'shared/types/redux';

export interface IReduxState {
  communications: {
    saving: ICommunication;
  };
  data: { message: string; } | null;
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

export type ISaveFieldsAction = IAction<'ORDER_FORM_MODULE:SAVE_FIELDS', ISaveFieldsRequest>;
export type ISaveFieldsCompletedAction = IAction<'ORDER_FORM_MODULE:SAVE_FIELDS_COMPLETED', ISaveFieldsResponse>;
export type ISaveFieldsFailedAction = IAction<'ORDER_FORM_MODULE:SAVE_FIELDS_FAILED', string>;

export type OrderFormAction =
  | ISaveFieldsAction
  | ISaveFieldsCompletedAction
  | ISaveFieldsFailedAction;
