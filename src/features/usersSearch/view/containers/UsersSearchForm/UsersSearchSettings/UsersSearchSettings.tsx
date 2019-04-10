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
const { userSearch: translations } = tKeys.features;

function UsersSearchSettings(props: IProps) {
  const { t } = useTranslation();

  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('item')}>
          <SelectField
            options={props.options}
            label={t(translations.searchBy.getKey())}
            name={fieldNames.searchBy}
          />
        </div>
        <div className={b('item')}>
          <SelectField
            options={perPageOptions}
            label={t(translations.resultsPerPage.getKey())}
            name={fieldNames.perPage}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('item')}>
          <FormLabel>
            {t(translations.searchFor.getKey())}
            <div className={b('checkbox-group')}>
              <RadioField name={fieldNames.searchFor} value="user" label={t(translations.users.getKey())} />
              <RadioField name={fieldNames.searchFor} value="org" label={t(translations.organizations.getKey())} />
              <RadioField name={fieldNames.searchFor} value="both" label={t(translations.both.getKey())} />
            </div>
          </FormLabel>
        </div>
        <div className={b('settings-group')}>
          <div className={b('item')}>
            <FormLabel>
              {t(translations.repositoriesNumber.getKey())}
              <div className={b('repos-number')}>
                <div className={b('repos-number-input')}>
                  <NumberInputField
                    name={fieldNames.minRepos}
                    label={t(translations.min.getKey())}
                  />
                </div>
                <div className={b('repos-number-input')}>
                  <NumberInputField
                    name={fieldNames.maxRepos}
                    label={t(translations.max.getKey())}
                  />
                </div>
              </div>
            </FormLabel>
          </div>
          <div className={b('item')}>
            <LanguageInputField name={fieldNames.reposLanguage} label={t(translations.repositoriesLanguage.getKey())} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersSearchSettings;
