import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { SearchForm } from 'shared/view/components';
import { makeRequired } from 'shared/validators';
import { IRepositoriesSearchFilters } from 'shared/types/githubSearch';

import { RepositoriesSearchSettings } from './RepositoriesSearchSettings/RepositoriesSearchSettings';
import { selectors, actionCreators } from './../../../redux';
import { IRepositoriesSearchFormFields } from '../../../namespace';
import { fieldNames } from './constants';

interface IOwnProps {
  onSubmit(formValues: IRepositoriesSearchFormFields): void;
}

interface IStateProps {
  isRepositoriesSearchRequesting: boolean;
}

type IActionProps = typeof mapDispatch;

type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

const mapDispatch = {
  searchRepositories: actionCreators.searchRepositories,
  resetSearchResults: actionCreators.resetSearchResults,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isRepositoriesSearchRequesting: selectors.selectCommunication(state, 'searchRepositories').isRequesting,
  };
}

const { repositoriesSearch: intl } = tKeys.features;

class RepositoriesSearchFormComponent extends React.PureComponent<IProps> {
  private selectFiltersLabels = createSelector(
    (props: IProps) => props.t,
    (t): Record<keyof IRepositoriesSearchFilters, string> => ({
      starsNumber: t(intl.minStars),
      forksNumber: t(intl.minForks),
      language: t(intl.language),
      owner: t(intl.owner),
    }),
  );

  private selectFilters = createSelector(
    (formValues: IRepositoriesSearchFormFields) => formValues,
    formValues => {
      const filters = R.omit([fieldNames.searchString], formValues);
      const filtersLabels = this.selectFiltersLabels(this.props);
      return RA.renameKeys(filtersLabels, filters) as Record<string, string | number>;
    },
  );

  public render() {
    const { isRepositoriesSearchRequesting, resetSearchResults, t } = this.props;
    return (
      <SearchForm<IRepositoriesSearchFormFields>
        searchInputName={fieldNames.searchString}
        isSearchRequesting={isRepositoriesSearchRequesting}
        submitButtonText={t(tKeys.shared.search)}
        settingsButtonText={t(tKeys.shared.settings)}
        dialogSubmitText={t(tKeys.shared.ok)}
        dialogTitleText={t(tKeys.shared.searchSettings)}
        validators={makeRequired(tKeys.shared.fieldIsRequiredError)}
        onSubmit={this.handleFormSubmit}
        resetSearchResults={resetSearchResults}
        renderSettings={RepositoriesSearchSettings}
        getFilters={this.selectFilters}
        t={t}
      />
    );
  }

  @autobind
  private handleFormSubmit(formValues: IRepositoriesSearchFormFields) {
    const { searchRepositories, onSubmit } = this.props;
    searchRepositories({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

const connectedComponent = connect(mapState, mapDispatch)(RepositoriesSearchFormComponent);
const RepositoriesSearchForm = withTranslation()(connectedComponent);

export {
  RepositoriesSearchFormComponent,
  RepositoriesSearchForm,
  IProps as IRepositoriesSearchFormProps,
};
