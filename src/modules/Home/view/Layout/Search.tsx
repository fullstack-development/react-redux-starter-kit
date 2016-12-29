import * as React from 'react';
import * as block from 'bem-cn';
import { PageHeader } from 'react-bootstrap';
import { SearchRepositoriesInput } from 'features/searchRepositories';
import * as GitHubIcon from './images/github-icon.png';
import * as s from './Layout.styl';

interface IProps {}

function Search (props: IProps) {
  const b = block('index-page');
  return (
    <div>
      <PageHeader>
        <img className={s[b('github-icon')()]} src={GitHubIcon} height="64"/>
        <small>
          Search repositories on github
        </small>
      </PageHeader>
      <SearchRepositoriesInput/>
    </div>
  );
}

export { IProps };
export default Search;
