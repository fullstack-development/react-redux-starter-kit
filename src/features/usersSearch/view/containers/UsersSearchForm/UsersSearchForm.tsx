import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';
import * as R from 'ramda';

import { withTranslation, TranslationProps, tKeys } from 'services/i18n';
import { makeRequired } from 'shared/validators';
import {
  replaceObjectKeys, replaceObjectValues, getSelectValuesToLabelsMap, KeysToValuesFormattersMap,
} from 'shared/helpers';
import { IAppReduxState } from 'shared/types/app';
import { IUsersSearchFilters } from 'shared/types/githubSearch';
import { SearchForm } from 'shared/view/components';
import { ISelectOption } from 'shared/types/form';

import { selectors, actions } from './../../../redux';
import { IUsersSearchFormFields } from '../../../namespace';
import { formInitialValues, fieldNames } from './constants';
import UsersSearchSettings from './UsersSearchSettings/UsersSearchSettings';

interface IOwnProps {
  onSubmit(values: IUsersSearchFormFields): void;
}

interface IStateProps {
  isUsersSearchRequesting: boolean;
}

type OptionType = ISelectOption<IUsersSearchFilters['searchBy']>;
type LabelsType = Record<IUsersSearchFilters['searchFor'], string>;
type IActionProps = typeof mapDispatch;
type IProps = IOwnProps & IStateProps & IActionProps & TranslationProps;

const mapDispatch = {
  searchUsers: actions.searchUsers,
  resetSearchResults: actions.resetSearchResults,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUsersSearchRequesting: selectors.selectCommunication(state, 'searchUser').isRequesting,
  };
}

const { userSearch: translations } = tKeys.features;

class UsersSearchForm extends React.PureComponent<IProps> {
  public render() {
    const { isUsersSearchRequesting, resetSearchResults, t } = this.props;
    const options: OptionType[] = [
      { value: 'username-email', label: t(translations.usernameAndEmail.getKey()) },
      { value: 'login', label: t(translations.username.getKey()) },
      { value: 'email', label: t(translations.email.getKey()) },
      { value: 'fullname', label: t(translations.fullName.getKey()) },
    ];
    const labels: LabelsType = {
      both: t(translations.usersAndOrganizations.getKey()),
      org: t(translations.organizations.getKey()),
      user: t(translations.users.getKey()),
    };

    const filtersValuesFormattersMap: KeysToValuesFormattersMap<IUsersSearchFilters> = {
      searchBy: x => getSelectValuesToLabelsMap(options)[x].toLowerCase(),
      searchFor: x => (labels)[x].toLowerCase(),
    };
    const renderUsersSearchSettings = () => <UsersSearchSettings options={options} />;

    return (
      <SearchForm<IUsersSearchFormFields>
        isSearchRequesting={isUsersSearchRequesting}
        searchInputName={fieldNames.searchString}
        onSubmit={this.handleFormSubmit}
        submitButtonText={t(tKeys.shared.search.getKey())}
        settingsButtonText={t(tKeys.shared.settings.getKey())}
        validators={makeRequired(tKeys.shared.fieldIsRequiredError.getKey())}
        initialValues={formInitialValues}
        renderSettings={renderUsersSearchSettings}
        resetSearchResults={resetSearchResults}
        getFilters={this.makeFiltersGetter(filtersValuesFormattersMap)}
        t={t}
      />
    );
  }

  @bind
  private makeFiltersGetter(filtersValuesFormattersMap: KeysToValuesFormattersMap<IUsersSearchFilters>) {
    return (formFields: IUsersSearchFormFields) => {
      const { t } = this.props;
      const filters = R.omit([fieldNames.searchString], formFields);
      const filtersLabels: Record<keyof IUsersSearchFilters, string> = {
        searchBy: t(translations.searchBy.getKey()),
        searchFor: t(translations.searchFor.getKey()),
        perPage: t(translations.resultsPerPage.getKey()),
        reposLanguage: t(translations.repositoriesLanguage.getKey()),
        minRepos: t(translations.minRepos.getKey()),
        maxRepos: t(translations.maxRepos.getKey()),
      };
      const filtersWithFormattedValues = replaceObjectValues(filters, filtersValuesFormattersMap);
      return replaceObjectKeys(filtersWithFormattedValues, filtersLabels);
    };
  }

  @bind
  private handleFormSubmit(formValues: IUsersSearchFormFields) {
    const { searchUsers, onSubmit } = this.props;
    searchUsers({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

const connectedComponent = connect(mapState, mapDispatch)(UsersSearchForm);

export { UsersSearchForm, IProps as IUsersSearchFormProps };
export default withTranslation()(connectedComponent);
