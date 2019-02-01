import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { Form, FormRenderProps } from 'react-final-form';
import block from 'bem-cn';

import { makeFormFieldNames } from 'shared/helpers';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';

import { SearchSettingsDialog } from '../../components';
import { actions } from './../../../redux';
import { IFormFields } from '../../../namespace';
import './UserSearchForm.scss';

interface IState {
  isSettingsDialogOpen: boolean;
}

interface IActionProps {
  searchUser: typeof actions.searchUser;
}

type IProps = IActionProps;

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchUser: actions.searchUser,
  }, dispatch);
}

const fieldNames = makeFormFieldNames<IFormFields>([
  'search', 'searchBy', 'minRepos', 'maxRepos', 'searchType', 'reposLanguage',
]);
const formInitialValues: Partial<IFormFields> = { searchBy: 'login-email', searchType: 'both' };

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

  // TODO: add 18n everywhere
  @bind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { isSettingsDialogOpen } = this.state;
    return (
      <form onSubmit={handleSubmit} className={b()}>
        <TextInputField name={fieldNames.search} fullWidth />
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
  private handleUserSearchFormSubmit(values: IFormFields) {
    const { search, ...options } = values;
    this.props.searchUser({ queryText: search, options });
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
