import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { Form, FormRenderProps } from 'react-final-form';
import block from 'bem-cn';

import { makeFormFieldNames } from 'shared/helpers';
import { TextInputField } from 'shared/view/form';
import { Button, Select } from 'shared/view/elements';
import { Dialog } from 'shared/view/components';

import { actions } from './../../../redux';
import { IFormFields } from '../../../namespace';
import { searchByOptions } from './constants';

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

const fieldNames = makeFormFieldNames<IFormFields>(['search', 'test']);

const b = block('user-search-form');

class UserSearchForm extends React.PureComponent<IProps> {
  public state: IState = {
    isSettingsDialogOpen: false,
  };

  private searchSettings: any; // TODO: !!!!!1111

  public render() {
    return (
      <Form
        onSubmit={this.handleUserSearchFormSubmit}
        render={this.renderForm}
      />
    );
  }

  // TODO: add 18n everywhere
  @bind
  private renderForm({ handleSubmit, values }: FormRenderProps) {
    return (
      <form onSubmit={handleSubmit} className={b()}>
        <TextInputField name={fieldNames.search} />
        <Button type="submit" variant="outlined">Search</Button>
        <div className={b('settings-button')} onClick={this.makeSettingsButtonClickHandler(values as IFormFields)}>
          <Button variant="outlined">Settings</Button>
        </div>
        {this.renderSettingsDialog()}
      </form>
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
          <Select options={searchByOptions} label="Search by" name="search-by" fullWidth />
        </div>
      </Dialog>
    );
  }

  @bind
  private renderSettingsDialogActions() {
    return (
      <div className={b('settings-dialog-buttons')}>
        <Button variant="outlined" onClick={this.handleSettingsApplyButtonClick}>Apply</Button>
        <Button variant="outlined" onClick={this.handleSettingsDialogClose}>Cancel</Button>
      </div>
    );
  }

  @bind
  private handleUserSearchFormSubmit(values: IFormFields) {
    console.log(values, this.searchSettings);
    this.props.searchUser(values.search);
  }

  @bind
  private makeSettingsButtonClickHandler(values: IFormFields) {
    return () => {
      this.searchSettings = {
        ...values,
      };
      this.setState({ isSettingsDialogOpen: true });
    };
  }

  @bind
  private handleSettingsDialogClose() {
    this.setState({ isSettingsDialogOpen: false });
  }

  @bind
  private handleSettingsApplyButtonClick() {
    // const { saveSearchSettings } = this.props;
    // saveSearchSettings();
    this.setState({ isSettingsDialogOpen: false });
  }
}

export default connect(null, mapDispatch)(UserSearchForm);
