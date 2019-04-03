import React from 'react';
import block from 'bem-cn';

import { FormLabel } from 'shared/view/elements';
import { SelectField, NumberInputField, RadioField, LanguageInputField } from 'shared/view/form';

import { searchByOptions, perPageOptions, fieldNames } from '../constants';
import './UsersSearchSettings.scss';

const b = block('users-search-settings');

function UsersSearchSettings() {
  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('item')}>
          <SelectField options={searchByOptions} label="Search by" name={fieldNames.searchBy} />
        </div>
        <div className={b('item')}>
          <LanguageInputField name={fieldNames.reposLanguage} label="Repositories language" />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('item')}>
          <FormLabel>
            Search type
            <div className={b('checkbox-group')}>
              <RadioField name={fieldNames.searchType} value="user" label="User" />
              <RadioField name={fieldNames.searchType} value="org" label="Organizations" />
              <RadioField name={fieldNames.searchType} value="both" label="Both" />
            </div>
          </FormLabel>
        </div>
        <div className={b('settings-group')}>
          <div className={b('item')}>
            <FormLabel>
              Repositories number
              <div className={b('repos-number')}>
                <div className={b('repos-number-input')}>
                  <NumberInputField
                    name={fieldNames.minRepos}
                    label="min"
                  />
                </div>
                <div className={b('repos-number-input')}>
                  <NumberInputField
                    name={fieldNames.maxRepos}
                    label="max"
                  />
                </div>
              </div>
            </FormLabel>
          </div>
          <div className={b('item')}>
            <SelectField options={perPageOptions} label="Results per page" name={fieldNames.perPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersSearchSettings;
