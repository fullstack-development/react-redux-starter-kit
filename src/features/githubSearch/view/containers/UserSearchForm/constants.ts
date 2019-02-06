import { ISelectOption } from 'shared/view/elements';
import { IUserSearchOptions } from 'shared/types/github';
import { IUserSearchFormFields } from '../../../namespace';

export const searchByOptions: Array<ISelectOption<IUserSearchOptions['searchBy']>> = [
  { value: 'username-email', label: 'Username & email' },
  { value: 'login', label: 'Username' },
  { value: 'email', label: 'Email' },
  { value: 'fullname', label: 'Full name' },
];

export const perPageOptions: Array<ISelectOption<IUserSearchOptions['perPage']>> = [
  { value: 30, label: 30 },
  { value: 60, label: 60 },
  { value: 100, label: 100 },
];

export const formInitialValues: IUserSearchFormFields = {
  searchString: '', searchBy: searchByOptions[0].value, searchType: 'both', perPage: perPageOptions[1].value,
};
