import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppReduxState } from 'shared/types/app';
import { IPaginationState } from 'shared/types/common';
import { PaginationControls } from 'shared/view/components';
import { IRepositoriesSearchFormFields } from '../../../namespace';

import { actions, selectors } from './../../../redux';

interface IOwnProps {
  formFields: IRepositoriesSearchFormFields;
}

interface IStateProps {
  paginationState: IPaginationState | null;
}

interface IActionProps {
  searchRepositories: typeof actions.searchRepositories;
}

type IProps = IOwnProps & IStateProps & IActionProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    paginationState: selectors.selectRepositoriesSearchPaginationState(state),
  };
}

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchRepositories: actions.searchRepositories,
  }, dispatch);
}

const b = block('repositories-search-pagination');

class RepositoriesSearchPagination extends React.PureComponent<IProps> {
  public render() {
    const { paginationState } = this.props;
    return paginationState && (
      <div className={b()}>
        <PaginationControls
          totalPages={paginationState.totalPages}
          currentPage={paginationState.page}
          onPageRequest={this.handlePageRequest}
        />
      </div>
    );
  }

  @bind
  private handlePageRequest(page: number) {
    const { searchRepositories, formFields } = this.props;
    searchRepositories({ ...formFields, page });
  }
}

export default connect(mapState, mapDispatch)(RepositoriesSearchPagination);
