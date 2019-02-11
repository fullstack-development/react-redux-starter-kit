import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { Form, FormRenderProps } from 'react-final-form';
import block from 'bem-cn';

import { IAppReduxState } from 'shared/types/app';
import { makeFormFieldNames } from 'shared/helpers';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';

import { selectors, actions } from './../../../redux';
import { IRepositoriesSearchFormFields } from '../../../namespace';
import './RepositoriesSearchForm.scss';

interface IOwnProps {
  onSubmit(searchString: string): void;
}

interface IStateProps {
  isRepositoriesSearchRequesting: boolean;
}

interface IActionProps {
  searchRepositories: typeof actions.searchRepositories;
}

type IProps = IOwnProps & IStateProps & IActionProps;

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchRepositories: actions.searchRepositories,
  }, dispatch);
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isRepositoriesSearchRequesting: selectors.selectCommunication(state, 'searchRepositories').isRequesting,
  };
}

const fieldNames = makeFormFieldNames<IRepositoriesSearchFormFields>(['searchString']);
const b = block('repositories-search-form');

class RepositoriesSearchForm extends React.PureComponent<IProps> {
  public render() {
    return (
      <Form
        onSubmit={this.handleRepositoriesSearchFormSubmit}
        render={this.renderForm}
      />
    );
  }

  @bind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { isRepositoriesSearchRequesting } = this.props;
    return (
      <form onSubmit={handleSubmit} className={b()}>
        <TextInputField
          name={fieldNames.searchString}
          disabled={isRepositoriesSearchRequesting}
          fullWidth
        />
        <div className={b('button')}>
          <Button
            type="submit"
            variant="outlined"
            disabled={isRepositoriesSearchRequesting}
          >
            Search
          </Button>
        </div>
      </form>
    );
  }

  @bind
  private handleRepositoriesSearchFormSubmit({ searchString }: IRepositoriesSearchFormFields) {
    const { searchRepositories, onSubmit } = this.props;
    searchRepositories({ searchString, page: 1 });
    onSubmit(searchString);
  }
}

export default connect(mapState, mapDispatch)(RepositoriesSearchForm);
