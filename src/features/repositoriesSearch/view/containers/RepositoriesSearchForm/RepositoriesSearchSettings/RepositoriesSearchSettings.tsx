import React from 'react';
import block from 'bem-cn';

import { useTranslation, tKeys } from 'services/i18n';
import { TextInputField, NumberInputField, LanguageInputField } from 'shared/view/form';

import { fieldNames } from '../constants';
import './RepositoriesSearchSettings.scss';

const b = block('repositories-search-settings');
const { repositoriesSearch: intl } = tKeys.features;

function RepositoriesSearchSettings() {
  const { t } = useTranslation();
  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('item')}>
          <NumberInputField
            name={fieldNames.starsNumber}
            label={t(intl.minStars)}
            t={t}
          />
        </div>
        <div className={b('item')}>
          <NumberInputField
            name={fieldNames.forksNumber}
            label={t(intl.minForks)}
            t={t}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('item')}>
          <TextInputField name={fieldNames.owner} label={t(intl.owner)} t={t} />
        </div>
        <div className={b('item')}>
          <LanguageInputField
            name={fieldNames.language}
            label={t(intl.repositoriesLanguage)}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}

export default RepositoriesSearchSettings;
