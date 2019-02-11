import * as React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';
import { IRepository } from 'shared/types/models';

import { selectors } from './../../../redux';
import { RepositoryPreview } from '../../components';
import './RepositoriesSearchResults.scss';

interface IStateProps {
  repositories: IRepository[] | null;
}

type IProps = IStateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    repositories: selectors.selectFoundRepositories(state),
  };
}

const b = block('repositories-search-results');

class RepositoriesSearchResults extends React.PureComponent<IProps> {
  public render() {
    const { repositories } = this.props;
    return repositories && (
      <div className={b()}>{repositories.map(this.renderRepositoryPreview)}</div>
    );
  }

  @bind
  private renderRepositoryPreview(repository: IRepository) {
    return (
      <div className={b('repository-preview')} key={repository.id}>
        <RepositoryPreview repository={repository} />
      </div>
    );
  }
}

export default connect(mapState)(RepositoriesSearchResults);
