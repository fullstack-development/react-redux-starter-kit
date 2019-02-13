import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IAppReduxState } from 'shared/types/app';
import { SearchForm } from 'shared/view/components';

import { selectors, actions } from './../../../redux';
import { IUserSearchFormFields } from '../../../namespace';
import { formInitialValues, fieldNames } from './constants';
import UserSearchSettings from './UserSearchSettings/UserSearchSettings';

interface IOwnProps {
  onSubmit(values: IUserSearchFormFields): void;
}

interface IStateProps {
  isUserSearchRequesting: boolean;
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
    isUserSearchRequesting: selectors.selectCommunication(state, 'searchUser').isRequesting,
  };
}

function UserSearchForm(props: IProps) {
  const { isUserSearchRequesting } = props;
  return (
    <SearchForm<IUserSearchFormFields>
      isSearchRequesting={isUserSearchRequesting}
      searchInputName={fieldNames.searchString}
      onSubmit={handleUserSearchFormSubmit}
      initialValues={formInitialValues}
      renderSettings={renderSettings}
      onResetSearchResults={props.resetSearchResults}
    />
  );

  function renderSettings() {
    return <UserSearchSettings />;
  }

  function handleUserSearchFormSubmit(values: IUserSearchFormFields) {
    const { searchUser, onSubmit } = props;
    searchUser({ ...values, page: 1 });
    onSubmit(values);
  }
}

export default connect(mapState, mapDispatch)(UserSearchForm);
