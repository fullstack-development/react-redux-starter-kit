import { IOrderFormResponse, ISaveFields, ISaveFieldsSuccess, ISaveFieldsFail } from '../../namespace';
import { IFlatFormProperties, ILocationProperties, SelectedLocation } from 'shared/types/models';

function saveFields(
  dynamicValues: IFlatFormProperties,
  locationValues: ILocationProperties,
  location: SelectedLocation,
): ISaveFields {
  return { type: 'HOME_MODULE:SAVE_FIELDS', payload: { dynamicValues, locationValues, location } };
}

function saveFieldsSuccess(response: IOrderFormResponse): ISaveFieldsSuccess {
  return {
    type: 'HOME_MODULE:SAVE_FIELDS_SUCCESS',
    payload: response,
  };
}

function saveFieldsFail(error: string): ISaveFieldsFail {
  return {
    type: 'HOME_MODULE:SAVE_FIELDS_FAIL',
    payload: error,
  };
}

export {
  saveFields,
  saveFieldsSuccess,
  saveFieldsFail,
};
