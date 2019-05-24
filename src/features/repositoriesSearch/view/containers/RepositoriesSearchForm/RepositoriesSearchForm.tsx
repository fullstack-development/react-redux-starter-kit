import React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as R from 'ramda';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { SearchForm } from 'shared/view/components';
import { replaceObjectKeys, memoizeByProps } from 'shared/helpers';
import { makeRequired } from 'shared/validators';
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

type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

const mapDispatch = {
  searchRepositories: actions.searchRepositories,
  resetSearchResults: actions.resetSearchResults,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isRepositoriesSearchRequesting: selectors.selectCommunication(state, 'searchRepositories').isRequesting,
  };
}

const { repositoriesSearch: intl } = tKeys.features;

class RepositoriesSearchForm extends React.PureComponent<IProps> {
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
        getFilters={this.getFilters}
        t={t}
      />
    );
  }

  @memoizeByProps((props: IProps, formValues) => [props.t, formValues])
  private getFilters(formValues: IRepositoriesSearchFormFields) {
    const { t } = this.props;
    const filters = R.omit([fieldNames.searchString], formValues);
    const filtersLabels: Record<keyof IRepositoriesSearchFilters, string> = {
      starsNumber: t(intl.minStars),
      forksNumber: t(intl.minForks),
      language: t(intl.language),
      owner: t(intl.owner),
    };
    return replaceObjectKeys(filters, filtersLabels);
  }

  @autobind
  private handleFormSubmit(formValues: IRepositoriesSearchFormFields) {
    const { searchRepositories, onSubmit } = this.props;
    searchRepositories({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

const connectedComponent = connect(mapState, mapDispatch)(RepositoriesSearchForm);

export { RepositoriesSearchForm, IProps as IRepositoriesSearchFormProps };
export default withTranslation()(connectedComponent);
