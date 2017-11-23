import { ICommunicationState, IPlainAction, IAction } from 'shared/types/app';

export interface IReduxState {
  communications: {
    saving: ICommunicationState;
  };
  data: { message: string; } | null;
}

export type ISaveFieldsAction = IPlainAction<'ORDER_FORM_MODULE:SAVE_FIELDS'>;
export type ISaveFieldsCompletedAction = IAction<'ORDER_FORM_MODULE:SAVE_FIELDS_COMPLETED', string>;
export type ISaveFieldsFailedAction = IAction<'ORDER_FORM_MODULE:SAVE_FIELDS_FAILED', string>;

export type OrderFormAction =
  | ISaveFieldsAction
  | ISaveFieldsCompletedAction
  | ISaveFieldsFailedAction;
