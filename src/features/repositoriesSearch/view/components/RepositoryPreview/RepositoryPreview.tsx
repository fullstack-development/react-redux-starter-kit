import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import { IRepository } from 'shared/types/models';
import { StarIcon } from 'shared/view/elements';

import RepositoryAttribute from '../RepositoryAttribute/RepositoryAttribute';
import './RepositoryPreview.scss';

interface IProps {
  repository: IRepository;
  onOwnerClick(username: string): void;
}

const b = block('repository-preview');

class RepositoryPreview extends React.PureComponent<IProps> {
  public render() {
    const {
      repository: {
        name, starsNumber, htmlURL, description, updatedAt,
        owner, forksNumber, openIssuesNumber, language,
      },
    } = this.props;

    return (
      <div className={b()}>
        <a className={b('name')} href={htmlURL} target="_blank">
          {name}
        </a>
        <div className={b('description')}>
          {description}
        </div>
        <div className={b('row')}>
          <div className={b('stars')}>
            <div className={b('star')}>
              <StarIcon fontSize="inherit" />
            </div>
            {starsNumber}
          </div>
          <div className={b('language')}>
            {language}
          </div>
        </div>
        <div className={b('row')}>
          <div className={b('attributes')}>
            <RepositoryAttribute
              title="Forks"
              value={forksNumber}
            />
            <RepositoryAttribute
              title="Open issues"
              value={openIssuesNumber}
            />
          </div>
          <div className={b('attributes')}>
            <RepositoryAttribute
              title="Last updated"
              value={(new Date(updatedAt)).toLocaleDateString()}
            />
            <RepositoryAttribute
              title="Owner"
              value={owner.username}
              onValueClick={this.handleOwnerClick}
              type="owner"
            />
          </div>
        </div>
      </div>
    );
  }

  @bind
  private handleOwnerClick() {
    const { repository: { owner: { username } }, onOwnerClick } = this.props;
    onOwnerClick(username);
  }
}

export { IProps as IRepositoryPreviewProps, RepositoryPreview };
export default RepositoryPreview;
