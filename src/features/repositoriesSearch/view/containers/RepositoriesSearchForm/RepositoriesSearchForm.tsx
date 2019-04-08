import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';
import * as R from 'ramda';

import { withTranslation, WithTranslation, tKeys } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { SearchForm } from 'shared/view/components';
import { replaceObjectKeys } from 'shared/helpers';

import { IRepositoriesSearchFilters } from 'shared/types/githubSearch';
import RepositoriesSearchSettings from './RepositoriesSearchSettings/RepositoriesSearchSettings';
import { selectors, actions } from './../../../redux';
import { IRepositoriesSearchFormFields } from '../../../namespace';
import { fieldNames } from './constants';

interface IOwnProps {
  onSubmit(formValues: IRepositoriesSearchFormFields): void;
}

interface IStateProps {
  isRepositoriesSearchRequesting: boolean;
}

type IActionProps = typeof mapDispatch;

type IProps = IOwnProps & IStateProps & IActionProps & WithTranslation;

const mapDispatch = {
  searchRepositories: actions.searchRepositories,
  resetSearchResults: actions.resetSearchResults,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isRepositoriesSearchRequesting: selectors.selectCommunication(state, 'searchRepositories').isRequesting,
  };
}

const { repositoriesSearch } = tKeys.features;

class RepositoriesSearchForm extends React.PureComponent<IProps> {
  public render() {
    const { isRepositoriesSearchRequesting, resetSearchResults, t } = this.props;
    return (
      <SearchForm<IRepositoriesSearchFormFields>
        searchInputName={fieldNames.searchString}
        isSearchRequesting={isRepositoriesSearchRequesting}
        submitButtonText={t(tKeys.shared.search.getKey())}
        settingsButtonText={t(tKeys.shared.settings.getKey())}
        errorFormText={t(tKeys.shared.fieldIsRequiredError.getKey())}
        onSubmit={this.handleFormSubmit}
        resetSearchResults={resetSearchResults}
        renderSettings={RepositoriesSearchSettings}
        getFilters={this.getFilters}
      />
    );
  }

  @bind
  private getFilters(formValues: IRepositoriesSearchFormFields) {
    const { t } = this.props;
    const filters = R.omit([fieldNames.searchString], formValues);
    const filtersLabels: Record<keyof IRepositoriesSearchFilters, string> = {
      starsNumber: t(repositoriesSearch.minStars.getKey()),
      forksNumber: t(repositoriesSearch.minForks.getKey()),
      language: t(repositoriesSearch.language.getKey()),
      owner: t(repositoriesSearch.owner.getKey()),
    };
    return replaceObjectKeys(filters, filtersLabels);
  }

  @bind
  private handleFormSubmit(formValues: IRepositoriesSearchFormFields) {
    const { searchRepositories, onSubmit } = this.props;
    searchRepositories({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

const connectedComponent = connect(mapState, mapDispatch)(RepositoriesSearchForm);

export { RepositoriesSearchForm, IProps as IRepositoriesSearchFormProps };
export default withTranslation()(connectedComponent);
