import { makeFormFieldNames } from 'shared/helpers';
import { IRepositoriesSearchFormFields } from '../../../namespace';

export const fieldNames = makeFormFieldNames<IRepositoriesSearchFormFields>([
  'searchString', 'forksNumber', 'owner', 'starsNumber', 'language',
]);
