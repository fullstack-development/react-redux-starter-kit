import React from 'react';
import block from 'bem-cn';

import { FormLabel } from 'shared/view/elements';
import { TextInputField, SelectField, NumberInputField, RadioField } from 'shared/view/form';

import { searchByOptions, perPageOptions, fieldNames, searchTypeLabels, filtersLabels } from '../constants';
import './UsersSearchSettings.scss';

const b = block('users-search-settings');

function UsersSearchSettings() {
  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('item')}>
          <SelectField options={searchByOptions} label={filtersLabels.searchBy} name={fieldNames.searchBy} />
        </div>
        <div className={b('item')}>
          <TextInputField name={fieldNames.reposLanguage} label={filtersLabels.reposLanguage} />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('item')}>
          <FormLabel>
            {filtersLabels.searchType}
            <div className={b('checkbox-group')}>
              <RadioField name={fieldNames.searchType} value="user" label={searchTypeLabels.user} />
              <RadioField name={fieldNames.searchType} value="org" label={searchTypeLabels.org} />
              <RadioField name={fieldNames.searchType} value="both" label={searchTypeLabels.both} />
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
                    label={filtersLabels.minRepos}
                  />
                </div>
                <div className={b('repos-number-input')}>
                  <NumberInputField
                    name={fieldNames.maxRepos}
                    label={filtersLabels.maxRepos}
                  />
                </div>
              </div>
            </FormLabel>
          </div>
          <div className={b('item')}>
            <SelectField options={perPageOptions} label={filtersLabels.perPage} name={fieldNames.perPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersSearchSettings;
