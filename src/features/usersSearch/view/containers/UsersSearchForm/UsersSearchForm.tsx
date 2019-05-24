import React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as R from 'ramda';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { makeRequired } from 'shared/validators';
import {
  replaceObjectKeys, replaceObjectValues, getSelectValuesToLabelsMap, KeysToValuesFormattersMap, memoizeByProps,
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
type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

const mapDispatch = {
  searchUsers: actions.searchUsers,
  resetSearchResults: actions.resetSearchResults,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUsersSearchRequesting: selectors.selectCommunication(state, 'searchUser').isRequesting,
  };
}

const { userSearch: intl } = tKeys.features;

class UsersSearchForm extends React.PureComponent<IProps> {
  public render() {
    const { isUsersSearchRequesting, resetSearchResults, t } = this.props;

    return (
      <SearchForm<IUsersSearchFormFields>
        isSearchRequesting={isUsersSearchRequesting}
        searchInputName={fieldNames.searchString}
        onSubmit={this.handleFormSubmit}
        submitButtonText={t(tKeys.shared.search)}
        settingsButtonText={t(tKeys.shared.settings)}
        dialogSubmitText={t(tKeys.shared.ok)}
        dialogTitleText={t(tKeys.shared.searchSettings)}
        validators={makeRequired(tKeys.shared.fieldIsRequiredError)}
        initialValues={formInitialValues}
        renderSettings={this.renderUsersSearchSettings}
        resetSearchResults={resetSearchResults}
        getFilters={this.getFilters}
        t={t}
      />
    );
  }

  @autobind
  private renderUsersSearchSettings() {
    return <UsersSearchSettings options={this.getOptions()} />;
  }

  private getLabels(): LabelsType {
    const { t } = this.props;
    return {
      both: t(intl.usersAndOrganizations),
      org: t(intl.organizations),
      user: t(intl.users),
    };
  }

  @memoizeByProps((props: IProps) => [props.t])
  private getOptions(): OptionType[] {
    const { t } = this.props;
    return [
      { value: 'username-email', label: t(intl.usernameAndEmail) },
      { value: 'login', label: t(intl.username) },
      { value: 'email', label: t(intl.email) },
      { value: 'fullname', label: t(intl.fullName) },
    ];
  }

  @memoizeByProps((props: IProps, formFields) => [props.t, formFields])
  private getFilters(formFields: IUsersSearchFormFields) {
    const { t } = this.props;
    const filters = R.omit([fieldNames.searchString], formFields);
    const filtersValuesFormattersMap: KeysToValuesFormattersMap<IUsersSearchFilters> = {
      searchBy: x => getSelectValuesToLabelsMap(this.getOptions())[x].toLowerCase(),
      searchFor: x => (this.getLabels())[x].toLowerCase(),
    };
    const filtersLabels: Record<keyof IUsersSearchFilters, string> = {
      searchBy: t(intl.searchBy),
      searchFor: t(intl.searchFor),
      perPage: t(intl.resultsPerPage),
      reposLanguage: t(intl.repositoriesLanguage),
      minRepos: t(intl.minRepos),
      maxRepos: t(intl.maxRepos),
    };
    const filtersWithFormattedValues = replaceObjectValues(filters, filtersValuesFormattersMap);
    return replaceObjectKeys(filtersWithFormattedValues, filtersLabels);
  }

  @autobind
  private handleFormSubmit(formValues: IUsersSearchFormFields) {
    const { searchUsers, onSubmit } = this.props;
    searchUsers({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

const connectedComponent = connect(mapState, mapDispatch)(UsersSearchForm);

export { UsersSearchForm, IProps as IUsersSearchFormProps };
export default withTranslation()(connectedComponent);
