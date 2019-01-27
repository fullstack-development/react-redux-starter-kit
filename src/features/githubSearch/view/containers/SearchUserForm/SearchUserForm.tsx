import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { Form, FormRenderProps } from 'react-final-form';

import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';

import { actions } from './../../../redux';

interface IActionProps {
  searchUser: typeof actions.searchUser;
}

type IProps = IActionProps;

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchUser: actions.searchUser,
  }, dispatch);
}

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
        <TextInputField name="search-field"/>
        <Button type="submit" disabled={submitting}>Search</Button>
      </form>
    );
  }

  @bind
  private handleSearchUserFormSubmit(values: any) {
    this.props.searchUser(values['search-field']);
  }
}

export default connect(null, mapDispatch)(SearchUserForm);
