import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { Form, FormRenderProps } from 'react-final-form';

import { makeFormFieldNames } from 'shared/helpers';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';

import { actions } from './../../../redux';
import { IFormFields } from '../../../namespace';

interface IActionProps {
  searchUser: typeof actions.searchUser;
}

type IProps = IActionProps;

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchUser: actions.searchUser,
  }, dispatch);
}

const fieldNames = makeFormFieldNames<IFormFields>(['search']);

class SearchUserForm extends React.PureComponent<IProps> {
  public render() {
    return (
      <Form
        onSubmit={this.handleSearchUserFormSubmit}
        render={this.renderForm}
      />
    );
  }

  @bind
  private renderForm({ handleSubmit, submitting }: FormRenderProps) {
    return (
      <form onSubmit={handleSubmit} className="search-form">
        <TextInputField name={fieldNames.search}/>
        <Button type="submit" disabled={submitting}>Search</Button>
      </form>
    );
  }

  @bind
  private handleSearchUserFormSubmit(values: IFormFields) {
    this.props.searchUser(values.search);
  }
}

export default connect(null, mapDispatch)(SearchUserForm);
