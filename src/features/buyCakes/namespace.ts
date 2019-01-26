import { ICakePreview } from 'shared/types/models';
import { ICommunication, IPlainAction, IPlainFailAction, IAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    cakesPreview: ICakePreview[];
  };
  communication: {
    loadCakesPreview: ICommunication;
  };
}

export type ILoadCakesPreview = IPlainAction<'BUY_CAKES:LOAD_CAKES_PREVIEW'>;
export type ILoadCakesPreviewSuccess = IAction<'BUY_CAKES:LOAD_CAKES_PREVIEW_SUCCESS', ICakePreview[]>;
export type ILoadCakesPreviewFail = IPlainFailAction<'BUY_CAKES:LOAD_CAKES_PREVIEW_FAIL'>;

export type IAction = ILoadCakesPreview | ILoadCakesPreviewSuccess | ILoadCakesPreviewFail;
