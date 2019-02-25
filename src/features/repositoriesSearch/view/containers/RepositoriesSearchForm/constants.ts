import { FormFieldNames } from 'shared/types/form';
import { IRepositoriesSearchFormFields } from '../../../namespace';

export const fieldNames: FormFieldNames<IRepositoriesSearchFormFields> = {
  searchString: 'searchString',
  starsNumber: 'starsNumber',
  forksNumber: 'forksNumber',
  language: 'language',
  owner: 'owner',
};
