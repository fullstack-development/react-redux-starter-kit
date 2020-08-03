import {createSelector} from 'reselect';

import {tKeys} from 'services/i18n';
import {getSelectValuesToLabelsMap} from 'shared/helpers';
import {ISelectOption} from 'shared/types/form';
import {IUsersSearchFilters} from 'shared/types/githubSearch';

import {IUsersSearchFormProps} from './UsersSearchForm';

type OptionType = ISelectOption<IUsersSearchFilters['searchBy']>;
type LabelsType = ISelectOption<IUsersSearchFilters['searchFor']>;

const {userSearch: intl} = tKeys.features;

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
    {value: 'username-email', label: t(intl.usernameAndEmail)},
    {value: 'login', label: t(intl.username)},
    {value: 'email', label: t(intl.email)},
    {value: 'fullname', label: t(intl.fullName)},
  ]),
);

export const selectOptionsSearchFor = createSelector(
  (props: IUsersSearchFormProps) => props.t,
  (t): LabelsType[]=> ([
    {value: 'both', label: t(intl.usersAndOrganizations)},
    {value: 'org', label: t(intl.organizations)},
    {value: 'user', label: t(intl.users)},
  ])
);

type ValueFormatter<T> = (x: T) => any;

interface IUserSearchFiltersFormattersMap {
  searchBy: ValueFormatter<IUsersSearchFilters['searchBy']>;
  searchFor: ValueFormatter<IUsersSearchFilters['searchFor']>;

  [key: string]: unknown;
}

export const selectFiltersValuesFormatters = createSelector(
  selectOptions,
  selectOptionsSearchFor,
  (options, searchForOptions): IUserSearchFiltersFormattersMap => ({
    searchBy: searchByValue => getSelectValuesToLabelsMap(options)[searchByValue].toLowerCase(),
    searchFor: searchForValue => getSelectValuesToLabelsMap(searchForOptions)[searchForValue].toLowerCase()
  }),
);
