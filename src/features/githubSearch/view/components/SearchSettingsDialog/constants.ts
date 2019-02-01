import { ISelectOption } from 'shared/view/elements';
import { IUserSearchOptions } from 'shared/types/github';

export const searchByOptions: Array<ISelectOption<IUserSearchOptions['searchBy']>> = [
  { value: 'login-email', label: 'Username & email' },
  { value: 'login', label: 'Username' },
  { value: 'email', label: 'Email' },
  { value: 'fullname', label: 'Full name' },
];

export const perPageOptions: Array<ISelectOption<IUserSearchOptions['perPage']>> = [
  { value: 30, label: 30 },
  { value: 60, label: 60 },
  { value: 100, label: 100 },
];
