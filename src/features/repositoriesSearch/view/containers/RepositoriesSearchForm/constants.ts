import { FormFieldNames } from 'shared/types/form';
import { IRepositoriesSearchFilters } from 'shared/types/githubSearch';
import { IRepositoriesSearchFormFields } from '../../../namespace';

export const fieldNames: FormFieldNames<IRepositoriesSearchFormFields> = {
  searchString: 'searchString',
  starsNumber: 'starsNumber',
  forksNumber: 'forksNumber',
  language: 'language',
  owner: 'owner',
};

export const filtersLabels: Record<keyof IRepositoriesSearchFilters, string> = {
  starsNumber: 'Stars number',
  forksNumber: 'Forks number',
  language: 'Language',
  owner: 'Owner',
};
