import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { Form, FormRenderProps } from 'react-final-form';
import block from 'bem-cn';

import { makeFormFieldNames } from 'shared/helpers';
import { TextInputField, SelectField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import { Dialog } from 'shared/view/components';

import { actions } from './../../../redux';
import { IFormFields } from '../../../namespace';
import { searchByOptions } from './constants';
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

const fieldNames = makeFormFieldNames<IFormFields>(['search', 'searchBy']);

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
        initialValues={{
          searchBy: searchByOptions[0].value,
        }}
      />
    );
  }

  // TODO: add 18n everywhere
  @bind
  private renderForm({ handleSubmit }: FormRenderProps) {
    return (
      <form onSubmit={handleSubmit} className={b()}>
        {this.renderTextFieldAndButtons()}
        {this.renderSettingsDialog()}
      </form>
    );
  }

  private renderTextFieldAndButtons() {
    return (
      <>
        <TextInputField name={fieldNames.search} />
        <Button type="submit" variant="outlined">Search</Button>
        <div className={b('settings-button')} onClick={this.handleSettingsButtonClick}>
          <Button variant="outlined">Settings</Button>
        </div>
      </>
    );
  }

  private renderSettingsDialog() {
    const { isSettingsDialogOpen } = this.state;
    return (
      <Dialog
        title="Search settings"
        onClose={this.handleSettingsDialogClose}
        isOpen={isSettingsDialogOpen}
        renderActions={this.renderSettingsDialogActions}
      >
        <div className={b('settings-dialog')}>
          <div className={b('settings-input')}>
            <SelectField options={searchByOptions} label="Search by" name={fieldNames.searchBy} fullWidth />
          </div>
        </div>
      </Dialog>
    );
  }

  @bind
  private renderSettingsDialogActions() {
    return (
      <div className={b('settings-actions')}>
        <Button variant="outlined" onClick={this.handleSettingsDialogClose}>Ok</Button>
      </div>
    );
  }

  @bind
  private handleUserSearchFormSubmit(values: IFormFields) {
    console.log(values);
    const { search, searchBy } = values;
    this.props.searchUser({ queryText: search, options: { searchBy }});
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
