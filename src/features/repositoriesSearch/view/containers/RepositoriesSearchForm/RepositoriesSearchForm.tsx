import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IAppReduxState } from 'shared/types/app';
import { makeFormFieldNames } from 'shared/helpers';
import { SearchForm } from 'shared/view/components';

import { selectors, actions } from './../../../redux';
import { IRepositoriesSearchFormFields } from '../../../namespace';

interface IOwnProps {
  onSubmit(searchString: string): void;
}

interface IStateProps {
  isRepositoriesSearchRequesting: boolean;
}

interface IActionProps {
  searchRepositories: typeof actions.searchRepositories;
  resetSearchResults: typeof actions.resetSearchResults;
}

type IProps = IOwnProps & IStateProps & IActionProps;

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchRepositories: actions.searchRepositories,
    resetSearchResults: actions.resetSearchResults,
  }, dispatch);
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isRepositoriesSearchRequesting: selectors.selectCommunication(state, 'searchRepositories').isRequesting,
  };
}

const fieldNames = makeFormFieldNames<IRepositoriesSearchFormFields>(['searchString']);

function RepositoriesSearchForm(props: IProps) {
  const { isRepositoriesSearchRequesting, resetSearchResults } = props;
  return (
    <SearchForm<IRepositoriesSearchFormFields>
      searchInputName={fieldNames.searchString}
      isSearchRequesting={isRepositoriesSearchRequesting}
      onSubmit={handleRepositoriesSearchFormSubmit}
      onResetSearchResults={resetSearchResults}
    />
  );

  function handleRepositoriesSearchFormSubmit({ searchString }: IRepositoriesSearchFormFields) {
    const { searchRepositories, onSubmit } = props;
    searchRepositories({ searchString, page: 1 });
    onSubmit(searchString);
  }
}

export default connect(mapState, mapDispatch)(RepositoriesSearchForm);
