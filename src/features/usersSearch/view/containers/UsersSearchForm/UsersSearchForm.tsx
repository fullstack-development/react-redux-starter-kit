import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';
import * as R from 'ramda';

import { replaceObjectKeys, replaceObjectValues, getSelectValueLabelMap } from 'shared/helpers';
import { IAppReduxState } from 'shared/types/app';
import { KeysToValuesFormattersMap } from 'shared/types/common';
import { SearchForm } from 'shared/view/components';
import { IUsersSearchFilters } from 'shared/types/githubSearch';

import { selectors, actions } from './../../../redux';
import { IUsersSearchFormFields } from '../../../namespace';
import { formInitialValues, fieldNames, searchByOptions, searchTypeLabels } from './constants';
import UsersSearchSettings from './UsersSearchSettings/UsersSearchSettings';

interface IOwnProps {
  onSubmit(values: IUsersSearchFormFields): void;
}

interface IStateProps {
  isUsersSearchRequesting: boolean;
}

type IActionProps = typeof mapDispatch;

type IProps = IOwnProps & IStateProps & IActionProps;

const mapDispatch = {
  searchUsers: actions.searchUsers,
  resetSearchResults: actions.resetSearchResults,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUsersSearchRequesting: selectors.selectCommunication(state, 'searchUser').isRequesting,
  };
}

class UsersSearchForm extends React.PureComponent<IProps> {
  private filtersNamesMap: Record<keyof IUsersSearchFilters, string> = {
    searchBy: 'Search by',
    searchType: 'Search for',
    perPage: 'Results per page',
    reposLanguage: 'Repositories language',
    minRepos: 'Min repositories',
    maxRepos: 'Max repositories',
  };

  private filtersValuesFormattersMap: KeysToValuesFormattersMap<IUsersSearchFilters> = {
    searchBy: x => getSelectValueLabelMap(searchByOptions)[x],
    searchType: x => searchTypeLabels[x],
  };

  public render() {
    const { isUsersSearchRequesting, resetSearchResults } = this.props;
    return (
      <SearchForm<IUsersSearchFormFields>
        isSearchRequesting={isUsersSearchRequesting}
        searchInputName={fieldNames.searchString}
        onSubmit={this.handleFormSubmit}
        initialValues={formInitialValues}
        renderSettings={UsersSearchSettings}
        resetSearchResults={resetSearchResults}
        getFilters={this.getFilters}
      />
    );
  }

  @bind
  private getFilters(formFields: IUsersSearchFormFields) {
    const filters = R.omit([fieldNames.searchString], formFields);
    const filtersWithFormattedValues = replaceObjectValues(filters, this.filtersValuesFormattersMap);
    return replaceObjectKeys(filtersWithFormattedValues, this.filtersNamesMap);
  }

  @bind
  private handleFormSubmit(formValues: IUsersSearchFormFields) {
    const { searchUsers, onSubmit } = this.props;
    searchUsers({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

export { UsersSearchForm, IProps as IUsersSearchFormProps };
export default connect(mapState, mapDispatch)(UsersSearchForm);
