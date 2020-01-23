import React from 'react';
import { defaultMemoize } from 'reselect';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

import { withTranslation, ITranslationProps, tKeys, TranslateFunction } from 'services/i18n';
import { makeRequired } from 'shared/validators';
import { IAppReduxState } from 'shared/types/app';
import { IUsersSearchFilters } from 'shared/types/githubSearch';
import { SearchForm } from 'shared/view/components';

import { selectors, actionCreators } from './../../../redux';
import { IUsersSearchFormFields } from '../../../namespace';
import { formInitialValues, fieldNames } from './constants';
import { selectFiltersValuesFormatters, selectOptions } from './selectors';
import { UsersSearchSettings } from './UsersSearchSettings/UsersSearchSettings';

interface IOwnProps {
  onSubmit(values: IUsersSearchFormFields): void;
}

interface IStateProps {
  isUsersSearchRequesting: boolean;
}

type IActionProps = typeof mapDispatch;
type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

type UsersSearchForm = IProps;

const mapDispatch = {
  searchUsers: actionCreators.searchUsers,
  resetSearchResults: actionCreators.resetSearchResults,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUsersSearchRequesting: selectors.selectCommunication(state, 'searchUser').isRequesting,
  };
}

const { userSearch: intl } = tKeys.features;

export class UsersSearchFormComponent extends React.PureComponent<IProps> {
  private makeFiltersSelector = defaultMemoize((t: TranslateFunction) => (formFields: IUsersSearchFormFields) => {
    const filters = R.omit([fieldNames.searchString], formFields);
    const filtersValuesFormattersMap = selectFiltersValuesFormatters(this.props);
    const filtersLabels = {
      searchBy: t(intl.searchBy),
      searchFor: t(intl.searchFor),
      perPage: t(intl.resultsPerPage),
      reposLanguage: t(intl.repositoriesLanguage),
      minRepos: t(intl.minRepos),
      maxRepos: t(intl.maxRepos),
    };
    const filtersWithFormattedValues = R.mapObjIndexed(
      (value: IUsersSearchFilters[keyof IUsersSearchFilters], key: keyof IUsersSearchFilters) => {
        const definedFormatter = filtersValuesFormattersMap[key];
        const formatterForCurrentKey = typeof definedFormatter === 'function'
          ? definedFormatter
          : R.identity;
        return formatterForCurrentKey(value);
      },
      filters,
    );
    return RA.renameKeys(filtersLabels, filtersWithFormattedValues) as Record<string, string | number>;
  });

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
        getFilters={this.makeFiltersSelector(t)}
        t={t}
      />
    );
  }

  @autobind
  private renderUsersSearchSettings() {
    return <UsersSearchSettings options={selectOptions(this.props)} />;
  }

  @autobind
  private handleFormSubmit(formValues: IUsersSearchFormFields) {
    const { searchUsers, onSubmit } = this.props;
    searchUsers({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

const UsersSearchForm = withTranslation()(connect(mapState, mapDispatch)(UsersSearchFormComponent));

export { UsersSearchForm, IProps as IUsersSearchFormProps };
