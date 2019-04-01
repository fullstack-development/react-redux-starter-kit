import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import block from 'bem-cn';
import { bind } from 'decko';

import { isRequired } from 'shared/validators';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';

import SearchFilters from './SearchFilters/SearchFilters';
import SearchSettingsDialog from './SearchSettingsDialog/SearchSettingsDialog';

import './SearchForm.scss';

interface IState {
  isSettingsDialogOpen: boolean;
}

interface IProps<FormFields> {
  isSearchRequesting: boolean;
  searchInputName: string;
  initialValues?: Partial<FormFields>;
  onSubmit(values: FormFields): void;
  resetSearchResults(): void;
  renderSettings?(): React.ReactChild;
  getFilters?(formValues: FormFields): Record<string, string | number>;
}

const b = block('search-form');

class SearchForm<FormFields extends object> extends React.PureComponent<IProps<FormFields>, IState> {
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
  private renderForm({ handleSubmit, form }: FormRenderProps) {
    const { isSearchRequesting, renderSettings, searchInputName, getFilters } = this.props;
    const { isSettingsDialogOpen } = this.state;
    return (
      <form onSubmit={handleSubmit} className={b()}>
        {getFilters &&
          <div className={b('filters')}>
            <SearchFilters filters={getFilters(form.getState().values as FormFields)} />
          </div>
        }
        <TextInputField name={searchInputName} disabled={isSearchRequesting} validate={isRequired} />
        <div className={b('buttons')}>
          <Button
            type="submit"
            variant="outlined"
            disabled={isSearchRequesting}
          >
            Search
          </Button>
          {renderSettings !== void 0 &&
            <div className={b('settings-button')}>
              <Button
                variant="outlined"
                onClick={this.handleSettingsButtonClick}
                disabled={isSearchRequesting}
              >
                Settings
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

export { IProps as ISearchFormProps };
export default SearchForm;
