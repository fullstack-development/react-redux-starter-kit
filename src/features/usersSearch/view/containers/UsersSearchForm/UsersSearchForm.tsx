import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { withTranslation, WithTranslation } from 'services/i18n';
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

type IActionProps = typeof mapDispatch;

type IProps = IOwnProps & IStateProps & IActionProps & WithTranslation;

const mapDispatch = {
  searchUser: actions.searchUser,
  resetSearchResults: actions.resetSearchResults,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUsersSearchRequesting: selectors.selectCommunication(state, 'searchUser').isRequesting,
  };
}

class UsersSearchForm extends React.PureComponent<IProps> {
  public render() {
    const { isUsersSearchRequesting, resetSearchResults, t } = this.props;
    return (
      <SearchForm<IUsersSearchFormFields>
        t={t}
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

const connectedComponent = connect(mapState, mapDispatch)(UsersSearchForm);
export default withTranslation()(connectedComponent);
