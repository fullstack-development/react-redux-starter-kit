import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';
import { SearchForm } from 'shared/view/components';

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

interface IActionProps {
  searchUser: typeof actions.searchUser;
  resetSearchResults: typeof actions.resetSearchResults;
}

type IProps = IOwnProps & IStateProps & IActionProps;

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchUser: actions.searchUser,
    resetSearchResults: actions.resetSearchResults,
  }, dispatch);
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUsersSearchRequesting: selectors.selectCommunication(state, 'searchUser').isRequesting,
  };
}

class UsersSearchForm extends React.PureComponent<IProps> {
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
      />
    );
  }

  @bind
  private handleFormSubmit(formValues: IUsersSearchFormFields) {
    const { searchUser, onSubmit } = this.props;
    searchUser({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

export default connect(mapState, mapDispatch)(UsersSearchForm);
