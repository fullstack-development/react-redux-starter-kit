import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { IAppReduxState } from 'shared/types/app';
import { IRepository, ISavedRepository } from 'shared/types/models';
import { Dialog, RepositoryPreview } from 'shared/view/components';
import { Preloader } from 'shared/view/elements';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import { actions, selectors } from './../../../redux';

interface IStateProps {
  repositoryIsLoading: boolean;
  repository: IRepository;
}

interface IOwnProps {
  id: number | null;
  isSaved: boolean;
  onClose(): void;
  onRemoveButtonClick(id: number): void;
  onSaveButtonClick(repo: ISavedRepository): void;
  onOwnerClick(id: number): void;
}

type IProps = ITranslationProps & IOwnProps & IStateProps & typeof mapDispatch;

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
    const { repositoryIsLoading, t } = this.props;
    const { profile: intl } = tKeys.features;

    return (
      <Dialog
        open={true}
        title={t(intl.repoPreviewTitle)}
        onEnter={this.handleDialogEnter}
        onClose={this.handleDialogClose}
      >
        <Dialog.Content>
          <div className={b()}>
            <Preloader
              size={80}
              isShown={repositoryIsLoading}
              backgroundColor="#fff"
            />
            {this.renderPreview()}
          </div>
        </Dialog.Content>
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
      isSaved,
      repository,
      repositoryIsLoading,
      onOwnerClick,
      onRemoveButtonClick,
      onSaveButtonClick,
    } = this.props;

    if (!repository || repositoryIsLoading) {
      return null;
    }

    return (
      <RepositoryPreview
        repository={repository}
        isSaved={isSaved}
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
)(withTranslation()(ProfileRepositoryPreview));
