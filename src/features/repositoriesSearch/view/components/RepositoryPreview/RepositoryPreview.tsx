import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import { IRepository } from 'shared/types/models';

import './RepositoryPreview.scss';

interface IProps {
  repository: IRepository;
  onOwnerClick(username: string): void;
}

const b = block('repository-preview');
/*tslint:disable*/
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
        <div className={b('column')}>
          <a className={b('name')} href={htmlURL} target="_blank">
            {name}
          </a>
          <div className={b('description')}>
            {description}
          </div>
          <div className={b('attributes')}>
            <div className={b('attributes-group')}>
              {this.renderAttribute('Forks', forksNumber)}
              {this.renderAttribute('Open issues', openIssuesNumber)}
            </div>
            <div className={b('attributes-group')}>
              {this.renderAttribute('Last updated', (new Date(updatedAt)).toLocaleDateString())}
              <div className={b('attribute')}>
                <span className={b('title')}>Owner:</span>
                <span className={b('value', { owner: true })} onClick={this.handleOwnerClick}>{owner.username}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={b('column')}>
          {language}
        </div>
        <div className={b('column')}>
          <div className={b('stars')}>
            <div className={b('star')} />
            {starsNumber}
          </div>
        </div>
      </div>
    );
  }

  private renderAttribute(title: string, value: string | number) {
    return (
      <div className={b('attribute')}>
        <span className={b('title')}>{title}:</span>
        <span className={b('value')}>{value}</span>
      </div>
    );
  }

  @bind
  private handleOwnerClick() {
    const { repository: { owner: { username } }, onOwnerClick } = this.props;
    onOwnerClick(username);
  }
}

export default RepositoryPreview;
