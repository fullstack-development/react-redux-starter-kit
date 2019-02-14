import * as React from 'react';
import block from 'bem-cn';

import { TextInputField, NumberInputField } from 'shared/view/form';

import { fieldNames } from '../constants';
import './RepositoriesSearchSettings.scss';

const b = block('repositories-search-settings');

function RepositoriesSearchSettings() {
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
          <NumberInputField
            name={fieldNames.starsNumber}
            label="Min stars"
          />
        </div>
        <div className={b('item')}>
          <NumberInputField
            name={fieldNames.forksNumber}
            label="Min forks"
          />
        </div>
      </div>
    );
  }

  function renderSecondRowSettings() {
    return (
      <div className={b('row')}>
        <div className={b('item')}>
          <TextInputField
            name={fieldNames.language}
            label="Repositories language"
          />
        </div>
        <div className={b('item')}>
          <TextInputField name={fieldNames.owner} label="Owner" />
        </div>
      </div>
    );
  }
}

export default RepositoriesSearchSettings;
