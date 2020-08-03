import React from 'react';
import block from 'bem-cn';

import { useTranslation, tKeys } from 'services/i18n';
import { NumberInputField, LanguageInputField } from 'shared/view/form';

import { fieldNames } from '../constants';
import './RepositoriesSearchSettings.scss';

const b = block('repositories-search-settings');
const { repositoriesSearch: intl } = tKeys.features;

function RepositoriesSearchSettings() {
  const { t } = useTranslation();
  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('item', {short: true})}>
          <div className={b('numbers')}>
            <div className={b('number')}>
              <NumberInputField
                name={fieldNames.starsNumber}
                label={t(intl.minStars)}
                t={t}
              />
            </div>
            <div className={b('number')}>
              <NumberInputField
                name={fieldNames.forksNumber}
                label={t(intl.minForks)}
                t={t}
              />
            </div>
          </div>
        </div>
        <div className={b('item', {long: true})}>
          <LanguageInputField
            name={fieldNames.language}
            label={t(intl.repositoriesLanguage)}
          />
        </div>
      </div>
    </div>
  );
}

export { RepositoriesSearchSettings };
