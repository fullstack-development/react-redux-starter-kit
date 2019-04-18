import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import { IRepository } from 'shared/types/models';
import { StarIcon, Card, Link } from 'shared/view/elements';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import RepositoryAttribute from '../RepositoryAttribute/RepositoryAttribute';
import './RepositoryPreview.scss';

interface IOwnProps {
  repository: IRepository;
  onOwnerClick(username: string): void;
}

type IProps = IOwnProps & ITranslationProps;

const b = block('repository-preview');
const { repositoriesSearch: translations } = tKeys.features;

class RepositoryPreview extends React.PureComponent<IProps> {
  public render() {
    const {
      t,
      repository: {
        name, starsNumber, htmlURL, description, updatedAt,
        owner, forksNumber, openIssuesNumber, language,
      },
    } = this.props;

    return (
      <Card>
        <div className={b()}>
          <Link className={b('name').toString()} href={htmlURL} target="_blank" rel="noopener noreferrer">
            {name}
          </Link>
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
                title={t(translations.forks.getKey())}
                value={forksNumber}
              />
              <RepositoryAttribute
                title={t(translations.openIssues.getKey())}
                value={openIssuesNumber}
              />
            </div>
            <div className={b('attributes')}>
              <RepositoryAttribute
                title={t(translations.lastUpdated.getKey())}
                value={(new Date(updatedAt)).toLocaleDateString()}
              />
              <RepositoryAttribute
                title={t(translations.owner.getKey())}
                value={owner.username}
                onValueClick={this.handleOwnerClick}
                type="owner"
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  @bind
  private handleOwnerClick() {
    const { repository: { owner: { username } }, onOwnerClick } = this.props;
    onOwnerClick(username);
  }
}

export { IProps as IRepositoryPreviewProps, RepositoryPreview };
export default withTranslation()(RepositoryPreview);
