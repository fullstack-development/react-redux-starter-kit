import React from 'react';
import block from 'bem-cn';

import { IRepository } from 'shared/types/models';

import './RepositoryPreview.scss';

interface IProps {
  repository: IRepository;
  onOwnerClick(username: string): void;
}

const b = block('repository-preview');

function RepositoryPreview(props: IProps) {
  const {
    repository: {
      name, starsNumber, htmlURL, description, updatedAt,
      owner, forksNumber, openIssuesNumber, language,
    },
  } = props;
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
          <div className={b('star')} />
          {starsNumber}
        </div>
        <div className={b('language')}>
          {language}
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('attributes')}>
          {renderAttribute('Forks', forksNumber)}
          {renderAttribute('Open issues', openIssuesNumber)}
        </div>
        <div className={b('attributes')}>
          {renderAttribute('Last updated', (new Date(updatedAt)).toLocaleDateString())}
          <div className={b('attribute')}>
            <span className={b('title')}>Owner:</span>
            <span className={b('value', { owner: true })} onClick={handleOwnerClick}>{owner.username}</span>
          </div>
        </div>
      </div>
    </div>
  );

  function renderAttribute(title: string, value: string | number) {
    return (
      <div className={b('attribute')}>
        <span className={b('title')}>{title}:</span>
        <span className={b('value')}>{value}</span>
      </div>
    );
  }

  function handleOwnerClick() {
    const { repository: { owner: { username } }, onOwnerClick } = props;
    onOwnerClick(username);
  }
}

export default RepositoryPreview;
