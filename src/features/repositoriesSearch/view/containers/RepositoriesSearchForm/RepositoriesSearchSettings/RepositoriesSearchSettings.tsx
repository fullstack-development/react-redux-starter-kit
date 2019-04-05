import React from 'react';
import block from 'bem-cn';

import { useTranslation, tKeys } from 'services/i18n';
import { TextInputField, NumberInputField, LanguageInputField } from 'shared/view/form';

import { fieldNames } from '../constants';
import './RepositoriesSearchSettings.scss';

const b = block('repositories-search-settings');
const { repositoriesSearch } = tKeys.features;

function RepositoriesSearchSettings() {
  const { t } = useTranslation();
  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('item')}>
          <NumberInputField
            name={fieldNames.starsNumber}
            label={t(repositoriesSearch.minStars.getKey())}
          />
        </div>
        <div className={b('item')}>
          <NumberInputField
            name={fieldNames.forksNumber}
            label={t(repositoriesSearch.minForks.getKey())}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('item')}>
          <TextInputField name={fieldNames.owner} label="Owner" />
        </div>
        <div className={b('item')}>
          <LanguageInputField
            name={fieldNames.language}
            label={t(repositoriesSearch.repositoriesLanguage.getKey())}
          />
        </div>
      </div>
    </div>
  );
}

export default RepositoriesSearchSettings;
