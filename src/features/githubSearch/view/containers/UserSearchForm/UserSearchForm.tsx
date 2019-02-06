import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { Form, FormRenderProps } from 'react-final-form';
import block from 'bem-cn';

import { makeFormFieldNames } from 'shared/helpers';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';

import SearchSettingsDialog from './SearchSettingsDialog/SearchSettingsDialog';
import { actions } from './../../../redux';
import { IUserSearchFormFields } from '../../../namespace';
import { formInitialValues } from './constants';
import './UserSearchForm.scss';

interface IOwnProps {
  onSubmit(values: IUserSearchFormFields): void;
}

interface IState {
  isSettingsDialogOpen: boolean;
}

interface IActionProps {
  searchUser: typeof actions.searchUser;
}

type IProps = IOwnProps & IActionProps;

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchUser: actions.searchUser,
  }, dispatch);
}

const fieldNames = makeFormFieldNames<IUserSearchFormFields>([
  'searchString', 'searchBy', 'minRepos', 'maxRepos', 'searchType', 'reposLanguage', 'perPage',
]);
const b = block('user-search-form');

class UserSearchForm extends React.PureComponent<IProps> {
  public state: IState = {
    isSettingsDialogOpen: false,
  };

  public render() {
    return (
      <Form
        onSubmit={this.handleUserSearchFormSubmit}
        render={this.renderForm}
        initialValues={formInitialValues}
      />
    );
  }
  // TODO: think about api auth
  // TODO: add 18n everywhere
  @bind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { isSettingsDialogOpen } = this.state;
    return (
      <form onSubmit={handleSubmit} className={b()}>
        <TextInputField name={fieldNames.searchString} fullWidth />
        <div className={b('buttons')}>
          <div className={b('settings-button')}>
            <Button variant="outlined" onClick={this.handleSettingsButtonClick}>Settings</Button>
          </div>
          <Button type="submit" variant="outlined">Search</Button>
        </div>
        <SearchSettingsDialog
          isOpen={isSettingsDialogOpen}
          fieldNames={fieldNames}
          onClose={this.handleSettingsDialogClose}
        />
      </form>
    );
  }

  @bind
  private handleUserSearchFormSubmit(values: IUserSearchFormFields) {
    const { searchUser, onSubmit } = this.props;
    searchUser({ ...values, page: 1 });
    onSubmit(values);
  }

  @bind
  private handleSettingsButtonClick() {
    this.setState({ isSettingsDialogOpen: true });
  }

  @bind
  private handleSettingsDialogClose() {
    this.setState({ isSettingsDialogOpen: false });
  }
}

export default connect(null, mapDispatch)(UserSearchForm);
