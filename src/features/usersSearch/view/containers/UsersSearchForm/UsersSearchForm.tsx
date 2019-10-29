import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as R from 'ramda';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { makeRequired } from 'shared/validators';
import { replaceObjectKeys, replaceObjectValues } from 'shared/helpers';
import { IAppReduxState } from 'shared/types/app';
import { SearchForm } from 'shared/view/components';

import { selectors, actions } from './../../../redux';
import { IUsersSearchFormFields } from '../../../namespace';
import { formInitialValues, fieldNames } from './constants';
import { selectFiltersValuesFormatters, selectOptions, selectFiltersLabels } from './selectors';
import UsersSearchSettings from './UsersSearchSettings/UsersSearchSettings';

interface IOwnProps {
  onSubmit(values: IUsersSearchFormFields): void;
}

interface IStateProps {
  isUsersSearchRequesting: boolean;
}

type IActionProps = typeof mapDispatch;
type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

const mapDispatch = {
  searchUsers: actions.searchUsers,
  resetSearchResults: actions.resetSearchResults,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUsersSearchRequesting: selectors.selectCommunication(state, 'searchUser').isRequesting,
  };
}

class UsersSearchForm extends React.PureComponent<IProps> {
  private getFilters = createSelector(
    (formFields: IUsersSearchFormFields) => formFields,
    formFields => {
      const filters = R.omit([fieldNames.searchString], formFields);
      const filtersValuesFormattersMap = selectFiltersValuesFormatters(this.props);
      const filtersLabels = selectFiltersLabels(this.props);
      const filtersWithFormattedValues = replaceObjectValues(filters, filtersValuesFormattersMap);
      return replaceObjectKeys(filtersWithFormattedValues, filtersLabels);
    });

  public render() {
    const { isUsersSearchRequesting, resetSearchResults, t } = this.props;

    return (
      <SearchForm<IUsersSearchFormFields>
        isSearchRequesting={isUsersSearchRequesting}
        searchInputName={fieldNames.searchString}
        onSubmit={this.handleFormSubmit}
        submitButtonText={t(tKeys.shared.search)}
        settingsButtonText={t(tKeys.shared.settings)}
        dialogSubmitText={t(tKeys.shared.ok)}
        dialogTitleText={t(tKeys.shared.searchSettings)}
        validators={makeRequired(tKeys.shared.fieldIsRequiredError)}
        initialValues={formInitialValues}
        renderSettings={this.renderUsersSearchSettings}
        resetSearchResults={resetSearchResults}
        getFilters={this.getFilters}
        t={t}
      />
    );
  }

  @autobind
  private renderUsersSearchSettings() {
    return <UsersSearchSettings options={selectOptions(this.props)} />;
  }

  @autobind
  private handleFormSubmit(formValues: IUsersSearchFormFields) {
    const { searchUsers, onSubmit } = this.props;
    searchUsers({ searchOptions: formValues, page: 1 });
    onSubmit(formValues);
  }
}

const connectedComponent = connect(mapState, mapDispatch)(UsersSearchForm);

export { UsersSearchForm, IProps as IUsersSearchFormProps };
export default withTranslation()(connectedComponent);
