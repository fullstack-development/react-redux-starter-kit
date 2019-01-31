import { IUserSearchOptions } from 'shared/types/github';

function constructSearchByQuery(searchBy: IUserSearchOptions['searchBy']) {
  if (searchBy !== 'login-email') {
    return `+in:${searchBy}`;
  }
  return '';
}

function constructReposNumberQuery(minRepos?: number, maxRepos?: number) {
  if (maxRepos === void 0 && (minRepos && minRepos > 0)) {
    return `+repos:>${minRepos}`;
  } else if (minRepos === void 0 && (maxRepos && maxRepos > 0)) {
    return `+repos:<${maxRepos}`;
  } else if (minRepos && maxRepos) {
    return `+repos:${minRepos}..${maxRepos}`;
  }
  return '';
}

export function constructUserSearchQuery(queryString: string, options: IUserSearchOptions) {
  const { searchBy, minRepos, maxRepos } = options;
  return queryString.concat(
    constructSearchByQuery(searchBy),
    constructReposNumberQuery(minRepos, maxRepos),
    '&per_page=100',
  );
}
