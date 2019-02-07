import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import { Button, FormLabel } from 'shared/view/elements';
import { TextInputField, SelectField, NumberInputField, RadioField } from 'shared/view/form';
import { Dialog } from 'shared/view/components';

import { IUserSearchFormFields } from '../../../../namespace';
import { searchByOptions, perPageOptions } from '../constants';
import './SearchSettingsDialog.scss';

interface IProps {
  isOpen: boolean;
  fieldNames: Record<keyof IUserSearchFormFields, string>;
  onClose(): void;
}

const b = block('search-settings-dialog');

class SearchSettingsDialog extends React.PureComponent<IProps> {
  public render() {
    const { isOpen, onClose } = this.props;
    return (
      <Dialog
        title="Search settings"
        onClose={onClose}
        open={isOpen}
        renderActions={this.renderActions}
      >
        <div className={b()}>
          {this.renderFirstRowSettings()}
          {this.renderSecondRowSettings()}
        </div>
      </Dialog>
    );
  }

  @bind
  private renderActions() {
    const { onClose } = this.props;
    return (
      <div className={b('actions')}>
        <Button variant="outlined" onClick={onClose}>Ok</Button>
      </div>
    );
  }

  private renderFirstRowSettings() {
    const { fieldNames } = this.props;
    return (
      <div className={b('row')}>
        <div className={b('item')}>
          <SelectField options={searchByOptions} label="Search by" name={fieldNames.searchBy} fullWidth />
        </div>
        <div className={b('item')}>
          <TextInputField name={fieldNames.reposLanguage} label="Repositories language" />
        </div>
      </div>
    );
  }

  private renderSecondRowSettings() {
    const { fieldNames } = this.props;
    return (
      <div className={b('row')}>
        <div className={b('item')}>
          {this.renderSearchTypeSettings()}
        </div>
        <div className={b('settings-group')}>
          <div className={b('item')}>
            {this.renderRepositoriesNumberSettings()}
          </div>
          <div className={b('item')}>
            <SelectField options={perPageOptions} label="Results per page" name={fieldNames.perPage} fullWidth />
          </div>
        </div>
      </div>
    );
  }

  private renderSearchTypeSettings() {
    const { fieldNames } = this.props;
    return (
      <FormLabel>
        Search type
        <div className={b('checkbox-group')}>
          <RadioField name={fieldNames.searchType} value="user" label="User" />
          <RadioField name={fieldNames.searchType} value="org" label="Organizations" />
          <RadioField name={fieldNames.searchType} value="both" label="Both" />
        </div>
      </FormLabel>
    );
  }

  private renderRepositoriesNumberSettings() {
    const { fieldNames } = this.props;
    return (
      <FormLabel>
        Repositories number
        <div className={b('repos-number')}>
          <div className={b('repos-number-input')}>
            <NumberInputField
              name={fieldNames.minRepos}
              label="min"
              fullWidth
            />
          </div>
          <div className={b('repos-number-input')}>
            <NumberInputField
              name={fieldNames.maxRepos}
              label="max"
              fullWidth
            />
          </div>
        </div>
      </FormLabel>
    );
  }

}

export default SearchSettingsDialog;
