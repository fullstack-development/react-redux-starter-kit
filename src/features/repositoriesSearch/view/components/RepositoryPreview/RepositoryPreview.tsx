import React from 'react';
import block from 'bem-cn';
import {autobind} from 'core-decorators';

import {IRepository} from 'shared/types/models';
import {Link} from 'shared/view/elements';
import {withTranslation, ITranslationProps, tKeys} from 'services/i18n';

import {RepositoryAttribute} from '../RepositoryAttribute/RepositoryAttribute';
import './RepositoryPreview.scss';

interface IOwnProps {
  repository: IRepository;

  onOwnerClick(username: string): void;
}

type IProps = IOwnProps & ITranslationProps;

const b = block('repository-preview');
const {repositoriesSearch: intl} = tKeys.features;

class RepositoryPreviewComponent extends React.PureComponent<IProps> {
  public render() {
    const {
      t,
      repository: {
        name, starsNumber, htmlURL, description, updatedAt,
        owner, forksNumber, openIssuesNumber, language,
      },
    } = this.props;

    return (
      <article className={b()}>
        <header className={b('header')}>
          <Link className={b('name').toString()} href={htmlURL} target="_blank" rel="noopener noreferrer">
            {name}
          </Link>
          <div className={b('attributes')}>
            <RepositoryAttribute title={t(intl.language)} value={language}/>
            <RepositoryAttribute
              title={t(intl.owner)}
              value={owner.username}
              onValueClick={this.handleOwnerClick}
              type="owner"
            />
          </div>
        </header>
        <div className={b('description')}>
          {description}
        </div>
        <footer className={b('footer')}>
          <div className={b('attributes')}>
            <RepositoryAttribute title={t(intl.stars)} value={starsNumber}/>
            <RepositoryAttribute title={t(intl.forks)} value={forksNumber}/>
            <RepositoryAttribute title={t(intl.openIssues)} value={openIssuesNumber}/>
          </div>
          <div className={b('attributes')}>
            <RepositoryAttribute
              title={t(intl.lastUpdated)}
              value={(new Date(updatedAt)).toLocaleDateString()}
            />
          </div>
        </footer>
      </article>
    );
  }

  @autobind
  private handleOwnerClick() {
    const {repository: {owner: {username}}, onOwnerClick} = this.props;
    onOwnerClick(username);
  }
}

const RepositoryPreview = withTranslation()(RepositoryPreviewComponent);

export {RepositoryPreview, IProps as IRepositoryPreviewProps, RepositoryPreviewComponent};
