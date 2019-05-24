import React from 'react';
import block from 'bem-cn';

import { FormLabel } from 'shared/view/elements';
import { useTranslation, tKeys } from 'services/i18n';
import { ISelectOption } from 'shared/types/form';
import { SelectField, NumberInputField, RadioField, LanguageInputField } from 'shared/view/form';
import { IUsersSearchFilters } from 'shared/types/githubSearch';

import { perPageOptions, fieldNames } from '../constants';
import './UsersSearchSettings.scss';

interface IProps {
  options: Array<ISelectOption<IUsersSearchFilters['searchBy']>>;
}

const b = block('users-search-settings');
const { userSearch: intl } = tKeys.features;

function UsersSearchSettings(props: IProps) {
  const { t } = useTranslation();

  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('item')}>
          <SelectField
            options={props.options}
            label={t(intl.searchBy)}
            name={fieldNames.searchBy}
            t={t}
          />
        </div>
        <div className={b('item')}>
          <SelectField
            options={perPageOptions}
            label={t(intl.resultsPerPage)}
            name={fieldNames.perPage}
            t={t}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('item')}>
          <FormLabel>
            {t(intl.searchFor)}
            <div className={b('checkbox-group')}>
              <RadioField name={fieldNames.searchFor} value="user" label={t(intl.users)} />
              <RadioField name={fieldNames.searchFor} value="org" label={t(intl.organizations)} />
              <RadioField name={fieldNames.searchFor} value="both" label={t(intl.both)} />
            </div>
          </FormLabel>
        </div>
        <div className={b('settings-group')}>
          <div className={b('item')}>
            <FormLabel>
              {t(intl.repositoriesNumber)}
              <div className={b('repos-number')}>
                <div className={b('repos-number-input')}>
                  <NumberInputField
                    name={fieldNames.minRepos}
                    label={t(intl.min)}
                    t={t}
                  />
                </div>
                <div className={b('repos-number-input')}>
                  <NumberInputField
                    name={fieldNames.maxRepos}
                    label={t(intl.max)}
                    t={t}
                  />
                </div>
              </div>
            </FormLabel>
          </div>
          <div className={b('item')}>
            <LanguageInputField
              name={fieldNames.reposLanguage}
              label={t(intl.repositoriesLanguage)}
              t={t}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersSearchSettings;
