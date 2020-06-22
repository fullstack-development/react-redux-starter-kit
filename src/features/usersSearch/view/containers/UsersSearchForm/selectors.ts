import { createSelector } from 'reselect';

import { tKeys } from 'services/i18n';
import { getSelectValuesToLabelsMap } from 'shared/helpers';
import { ISelectOption } from 'shared/types/form';
import { IUsersSearchFilters } from 'shared/types/githubSearch';

import { IUsersSearchFormProps } from './UsersSearchForm';

type OptionType = ISelectOption<IUsersSearchFilters['searchBy']>;
type LabelsType = Record<IUsersSearchFilters['searchFor'], string>;

const { userSearch: intl } = tKeys.features;

export const selectFiltersLabels = createSelector(
  (props: IUsersSearchFormProps) => props.t,
  (t): Record<keyof IUsersSearchFilters, string> => ({
    searchBy: t(intl.searchBy),
    searchFor: t(intl.searchFor),
    perPage: t(intl.resultsPerPage),
    reposLanguage: t(intl.repositoriesLanguage),
    minRepos: t(intl.minRepos),
    maxRepos: t(intl.maxRepos),
  }),
);

export const selectOptions = createSelector(
  (props: IUsersSearchFormProps) => props.t,
  (t): OptionType[] => ([
    { value: 'username-email', label: t(intl.usernameAndEmail) },
    { value: 'login', label: t(intl.username) },
    { value: 'email', label: t(intl.email) },
    { value: 'fullname', label: t(intl.fullName) },
  ]),
);

export const selectLabels = createSelector(
  (props: IUsersSearchFormProps) => props.t,
  (t): LabelsType => ({
    both: t(intl.usersAndOrganizations),
    org: t(intl.organizations),
    user: t(intl.users),
  }),
);

type ValueFormatter<T> = (x: T) => any;
interface IUserSearchFiltersFormattersMap {
  searchBy: ValueFormatter<IUsersSearchFilters['searchBy']>;
  searchFor: ValueFormatter<IUsersSearchFilters['searchFor']>;
  [key: string]: unknown;
}

export const selectFiltersValuesFormatters = createSelector(
  selectOptions,
  selectLabels,
  (options, labels): IUserSearchFiltersFormattersMap => ({
    searchBy: searchByValue => getSelectValuesToLabelsMap(options)[searchByValue].toLowerCase(),
    searchFor: searchForValue => labels[searchForValue].toLowerCase(),
  }),
);
