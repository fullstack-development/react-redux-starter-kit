import React, { useState, useEffect } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import block from 'bem-cn';

import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import SearchSettingsDialog from './SearchSettingsDialog/SearchSettingsDialog';

import './SearchForm.scss';

interface IProps<FormFields> {
  isSearchRequesting: boolean;
  searchInputName: string;
  initialValues?: Partial<FormFields>;
  onSubmit(values: FormFields): void;
  resetSearchResults(): void;
  renderSettings?(): React.ReactChild;
}

const b = block('search-form');

function SearchForm<T extends object>(props: IProps<T>) {
  const { onSubmit, initialValues, resetSearchResults } = props;
  const [isSettingsDialogOpen, toggleSettingsDialog] = useState(false);
  useEffect(() => resetSearchResults, []);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={renderForm}
    />
  );

  function renderForm({ handleSubmit }: FormRenderProps) {
    const { isSearchRequesting, renderSettings, searchInputName } = props;
    return (
      <form onSubmit={handleSubmit} className={b()}>
        <TextInputField name={searchInputName} disabled={isSearchRequesting} />
        <div className={b('buttons')}>
          <Button
            type="submit"
            variant="outlined"
            disabled={isSearchRequesting}
          >
            Search
          </Button>
          {renderSettings !== void 0 &&
            <div className={b('settings')}>
              <Button
                variant="outlined"
                onClick={handleSettingsButtonClick}
                disabled={isSearchRequesting}
              >
                Settings
              </Button>
              <SearchSettingsDialog
                isOpen={isSettingsDialogOpen}
                onClose={handleSettingsDialogClose}
                renderContent={renderSettings}
              />
            </div>
          }
        </div>
      </form>
    );
  }

  function handleSettingsButtonClick() {
    toggleSettingsDialog(true);
  }

  function handleSettingsDialogClose() {
    toggleSettingsDialog(false);
  }
}

export default SearchForm;
