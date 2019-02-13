import { ISelectOption } from 'shared/view/elements';
import { IUsersSearchOptions } from 'shared/types/github';
import { makeFormFieldNames } from 'shared/helpers';
import { IUsersSearchFormFields } from '../../../namespace';

export const searchByOptions: Array<ISelectOption<IUsersSearchOptions['searchBy']>> = [
  { value: 'username-email', label: 'Username & email' },
  { value: 'login', label: 'Username' },
  { value: 'email', label: 'Email' },
  { value: 'fullname', label: 'Full name' },
];

export const perPageOptions: Array<ISelectOption<IUsersSearchOptions['perPage']>> = [
  { value: 30, label: 30 },
  { value: 50, label: 50 },
  { value: 100, label: 100 },
];

export const formInitialValues: IUsersSearchFormFields = {
  searchString: '', searchBy: searchByOptions[0].value, searchType: 'both', perPage: perPageOptions[1].value,
};

export const fieldNames = makeFormFieldNames<IUsersSearchFormFields>([
  'searchString', 'searchBy', 'minRepos', 'maxRepos', 'searchType', 'reposLanguage', 'perPage',
]);
