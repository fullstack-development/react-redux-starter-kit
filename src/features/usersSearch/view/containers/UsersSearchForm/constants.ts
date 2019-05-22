import { IUsersSearchFilters } from 'shared/types/githubSearch';
import { FormFieldNames, ISelectOption } from 'shared/types/form';
import { IUsersSearchFormFields } from '../../../namespace';

export const perPageOptions: Array<ISelectOption<IUsersSearchFilters['perPage']>> = [
  { value: 30, label: '30' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

export const formInitialValues: IUsersSearchFormFields = {
  searchString: '', searchBy: 'username-email', searchFor: 'both', perPage: perPageOptions[0].value,
};

export const fieldNames: FormFieldNames<IUsersSearchFormFields> = {
  searchString: 'searchString',
  searchBy: 'searchBy',
  searchFor: 'searchFor',
  perPage: 'perPage',
  reposLanguage: 'reposLanguage',
  maxRepos: 'maxRepos',
  minRepos: 'minRepos',
};
