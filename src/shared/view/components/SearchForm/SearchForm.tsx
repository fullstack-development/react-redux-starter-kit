import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import block from 'bem-cn';
import { bind } from 'decko';

import { isRequired } from 'shared/validators';
import { TranslateFunction, tKeys } from 'services/i18n';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';

import SearchSettingsDialog from './SearchSettingsDialog/SearchSettingsDialog';

import './SearchForm.scss';

interface IState {
  isSettingsDialogOpen: boolean;
}

interface IOwnProps<FormFields> {
  t: TranslateFunction;
  isSearchRequesting: boolean;
  searchInputName: string;
  initialValues?: Partial<FormFields>;
  onSubmit(values: FormFields): void;
  resetSearchResults(): void;
  renderSettings?(): React.ReactChild;
}

type IProps<T> = IOwnProps<T>;

const b = block('search-form');
const { search, settings } = tKeys.shared;

class SearchForm<T extends object> extends React.PureComponent<IProps<T>, IState> {
  public state: IState = {
    isSettingsDialogOpen: false,
  };

  public componentWillUnmount() {
    this.props.resetSearchResults();
  }

  public render() {
    const { onSubmit, initialValues } = this.props;
    return (
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={this.renderForm}
        subscription={{}}
      />
    );
  }

  @bind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { isSearchRequesting, renderSettings, searchInputName, t } = this.props;
    const { isSettingsDialogOpen } = this.state;
    return (
      <form onSubmit={handleSubmit} className={b()}>
        <TextInputField name={searchInputName} disabled={isSearchRequesting} validate={isRequired} />
        <div className={b('buttons')}>
          <Button
            type="submit"
            variant="outlined"
            disabled={isSearchRequesting}
          >
            {t(search.getKey())}
          </Button>
          {renderSettings !== void 0 &&
            <div className={b('settings')}>
              <Button
                variant="outlined"
                onClick={this.handleSettingsButtonClick}
                disabled={isSearchRequesting}
              >
                {t(settings.getKey())}
              </Button>
              <SearchSettingsDialog
                isOpen={isSettingsDialogOpen}
                onClose={this.handleSettingsDialogClose}
                renderContent={renderSettings}
              />
            </div>
          }
        </div>
      </form>
    );
  }

  @bind
  private handleSettingsButtonClick() {
    this.setState({ isSettingsDialogOpen: true });
  }

  @bind
  private handleSettingsDialogClose() {
    this.setState({ isSettingsDialogOpen: false });
  }
}

export default SearchForm;
