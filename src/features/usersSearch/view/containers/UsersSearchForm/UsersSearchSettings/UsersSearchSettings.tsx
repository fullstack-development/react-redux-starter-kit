import React from 'react';
import block from 'bem-cn';

import {useTranslation, tKeys} from 'services/i18n';
import {ISelectOption} from 'shared/types/form';
import {SelectField, NumberInputField, LanguageInputField} from 'shared/view/form';
import {IUsersSearchFilters} from 'shared/types/githubSearch';

import {perPageOptions, fieldNames} from '../constants';
import './UsersSearchSettings.scss';

interface IProps {
  options: Array<ISelectOption<IUsersSearchFilters['searchBy']>>;
  searchForOptions: Array<ISelectOption<IUsersSearchFilters['searchFor']>>;
}

const b = block('users-search-settings');
const {userSearch: intl} = tKeys.features;

function UsersSearchSettings({options, searchForOptions}: IProps) {
  const {t} = useTranslation();

  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('item', {short: true})}>
          <div className={b('repos-number')}>
            <div className={b('repos-number-input')}>
              <NumberInputField
                name={fieldNames.minRepos}
                label={t(intl.repositoriesNumber)}
                placeholder={t(intl.min)}
                t={t}
              />
            </div>
            <div className={b('repos-number-input')}>
              <NumberInputField
                name={fieldNames.maxRepos}
                label={t(intl.repositoriesNumber)}
                placeholder={t(intl.max)}
                t={t}
              />
            </div>
          </div>
        </div>
        <div className={b('item', {long: true})}>
          <div className={b('checkbox-group')}>
            <LanguageInputField label={t(intl.repositoriesLanguage)} name={fieldNames.reposLanguage}/>
          </div>

        </div>
      </div>
      <div className={b('row')}>
        <div className={b('item')}>
          <SelectField
            options={options}
            label={t(intl.searchBy)}
            name={fieldNames.searchBy}
            t={t}
          />
        </div>
        <div className={b('item')}>
          <SelectField
            options={searchForOptions}
            label={t(intl.searchFor)}
            name={fieldNames.searchFor}
            t={t}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('item')}>
          <SelectField
            options={perPageOptions}
            label={t(intl.resultsPerPage)}
            name={fieldNames.perPage}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}

export {UsersSearchSettings};
