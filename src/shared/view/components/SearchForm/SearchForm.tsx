import React from 'react';
import {Form, FormRenderProps} from 'react-final-form';
import block from 'bem-cn';
import {autobind} from 'core-decorators';

import {TextInputField} from 'shared/view/form';
import {Button} from 'shared/view/elements';
import {TranslateFunction, ITranslateObject, ITranslateKey} from 'services/i18n';


import './SearchForm.scss';

interface IState {
  isSettingsShow: boolean;
}

interface IOwnProps<FormFields> {
  isSearchRequesting: boolean;
  searchInputName: string;
  searchInputPlaceholder?: string;
  initialValues?: Partial<FormFields>;
  submitButtonText: string;
  showSettingsButtonText: string;
  hideSettingsButtonText: string;
  dialogTitleText: string;
  dialogSubmitText: string;
  t: TranslateFunction;

  validators(value: string): string | ITranslateObject | ITranslateKey | undefined;

  onSubmit(values: FormFields): void;

  resetSearchResults(): void;

  renderSettings?(): React.ReactChild;

  renderTopField?(): React.ReactChild;

  getFilters?(formValues: FormFields): Record<string, string | number>;
}

type IProps<T> = IOwnProps<T>;

const b = block('search-form');

class SearchForm<FormFields extends object> extends React.PureComponent<IProps<FormFields>, IState> {
  public state: IState = {
    isSettingsShow: false,
  };

  public componentWillUnmount() {
    const {resetSearchResults} = this.props;
    resetSearchResults();
  }

  public render() {
    const {onSubmit, initialValues} = this.props;
    return (
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={this.renderForm}
        subscription={{}}
      />
    );
  }

  @autobind
  private renderForm({handleSubmit}: FormRenderProps) {
    const {
      isSearchRequesting, renderSettings, searchInputName, submitButtonText,
      validators, t, showSettingsButtonText, hideSettingsButtonText,
      renderTopField, searchInputPlaceholder
    } = this.props;

    const {isSettingsShow} = this.state;

    return (
      <form onSubmit={handleSubmit} className={b()}>
        <div className={b('search-line')}>
          <div className={b('input-line')}>
            <div className={b('input')}>
              <TextInputField
                name={searchInputName}
                disabled={isSearchRequesting}
                validate={validators}
                t={t}
                placeholder={searchInputPlaceholder}
              />
            </div>
            {renderTopField !== undefined && (
              <div className={b('input')}>{renderTopField()}</div>
            )}
          </div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isSearchRequesting}
          >
            {submitButtonText}
          </Button>
        </div>
        <div className={b('settings')}>
          <button className={b('settings-trigger')}
                  type='button'
                  onClick={this.handleToggleSettings}
          >
            { isSettingsShow ? hideSettingsButtonText : showSettingsButtonText }
          </button>
          <div className={b('settings-body', {active: this.state.isSettingsShow})}>
            {renderSettings !== undefined && renderSettings()}
          </div>
        </div>

      </form>
    );
  }

  @autobind
  private handleToggleSettings() {
    this.setState({isSettingsShow: !this.state.isSettingsShow})
  }
}

export {SearchForm, IProps as ISearchFormProps};
