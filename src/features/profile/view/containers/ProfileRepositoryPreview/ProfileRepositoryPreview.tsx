import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { IAppReduxState } from 'shared/types/app';
import { IRepository } from 'shared/types/models';
import { Dialog } from 'shared/view/components';
import { Preloader } from 'shared/view/elements';
import { RepositoryPreview } from 'shared/view/components';

import { actions, selectors } from './../../../redux';

const b = block('repository-preview-dialog');

type IProps = {};

class ProfileRepositoryPreview extends React.Component<IProps> {
  public render() {
    return (
      <Dialog
        open={true}
        title="repo"
        onEnter={this.handleDialogEnter}
        onClose={this.handleDialogClose}
      >
        <div className={b()}>
          <Preloader size={80} isShown={true} backgroundColor="#fff" />
          {this.renderPreview()}
        </div>
      </Dialog>
    );
  }

  @autobind
  private handleDialogEnter() {}

  @autobind
  private handleDialogClose() {}

  @autobind
  private renderPreview() {}
}

export default ProfileRepositoryPreview;
