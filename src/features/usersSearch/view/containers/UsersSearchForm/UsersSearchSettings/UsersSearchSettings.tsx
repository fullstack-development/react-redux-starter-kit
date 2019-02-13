import * as React from 'react';
import block from 'bem-cn';

import { FormLabel } from 'shared/view/elements';
import { TextInputField, SelectField, NumberInputField, RadioField } from 'shared/view/form';

import { searchByOptions, perPageOptions, fieldNames } from '../constants';
import './UsersSearchSettings.scss';

const b = block('users-search-settings');

function UsersSearchSettings() {
  return (
    <div className={b()}>
      {renderFirstRowSettings()}
      {renderSecondRowSettings()}
    </div>
  );

  function renderFirstRowSettings() {
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

  function renderSecondRowSettings() {
    return (
      <div className={b('row')}>
        <div className={b('item')}>
          {renderSearchTypeSettings()}
        </div>
        <div className={b('settings-group')}>
          <div className={b('item')}>
            {renderRepositoriesNumberSettings()}
          </div>
          <div className={b('item')}>
            <SelectField options={perPageOptions} label="Results per page" name={fieldNames.perPage} fullWidth />
          </div>
        </div>
      </div>
    );
  }

  function renderSearchTypeSettings() {
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

  function renderRepositoriesNumberSettings() {
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

export default UsersSearchSettings;
