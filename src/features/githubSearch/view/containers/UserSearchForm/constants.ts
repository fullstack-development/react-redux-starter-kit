import { ISelectOption } from 'shared/view/elements';
import { IUserSearchQualifiers } from 'shared/types/github';

export const searchByOptions: Array<ISelectOption<IUserSearchQualifiers['searchBy']>> = [
  { value: 'login', label: 'Username' },
  { value: 'fullname', label: 'Full name' },
  { value: 'email', label: 'Email' },
];
