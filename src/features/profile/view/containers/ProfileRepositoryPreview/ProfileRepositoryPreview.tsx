import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { IAppReduxState } from 'shared/types/app';
import { IRepository, ISavedRepository } from 'shared/types/models';
import { Dialog, RepositoryPreview } from 'shared/view/components';
import { Preloader } from 'shared/view/elements';

import { actions, selectors } from './../../../redux';

interface IStateProps {
  repositoryIsLoading: boolean;
  repository: IRepository;
}

interface IOwnProps {
  id: number | null;
  onClose(): void;
  onRemoveButtonClick(id: number): void;
  onSaveButtonClick(repo: ISavedRepository): void;
  onOwnerClick(id: number): void;
}

type IProps = IOwnProps & IStateProps & typeof mapDispatch;

function mapState(state: IAppReduxState) {
  return {
    repositoryIsLoading: selectors.selectCommunication(state, 'loadRepository')
      .isRequesting,
    repository: selectors.selectLoadedRepository(state),
  };
}

const mapDispatch = { getRepository: actions.getRepository };

const b = block('repository-preview-dialog');

class ProfileRepositoryPreview extends React.Component<IProps> {
  public render() {
    const { repositoryIsLoading } = this.props;

    return (
      <Dialog
        open={true}
        title="Repository"
        onEnter={this.handleDialogEnter}
        onClose={this.handleDialogClose}
      >
        <div className={b()}>
          {
            <Preloader
              size={80}
              isShown={repositoryIsLoading}
              backgroundColor="#fff"
            />
          }
          {this.renderPreview()}
        </div>
      </Dialog>
    );
  }

  @autobind
  private handleDialogEnter() {
    const { id, getRepository } = this.props;
    getRepository(id as number);
  }

  @autobind
  private handleDialogClose() {
    const { onClose } = this.props;
    onClose();
  }

  @autobind
  private renderPreview() {
    const {
      repository,
      onOwnerClick,
      onRemoveButtonClick,
      onSaveButtonClick,
    } = this.props;
    if (!repository) {
      return null;
    }

    return (
      <RepositoryPreview
        repository={repository}
        isSaved={true}
        onRemoveButtonClick={onRemoveButtonClick}
        onSaveButtonClick={onSaveButtonClick}
        onOwnerClick={onOwnerClick}
      />
    );
  }
}

export default connect(
  mapState,
  mapDispatch,
)(ProfileRepositoryPreview);
