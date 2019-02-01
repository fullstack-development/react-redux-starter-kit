import { IUserSearchOptions } from 'shared/types/github';

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
  const { searchBy, searchType, minRepos, maxRepos, reposLanguage } = options;
  return queryString.concat(
    searchBy !== 'login-email' ? `+in:${searchBy}` : '',
    searchType !== 'both' ? `+type:${searchType}` : '',
    reposLanguage ? `+language:${reposLanguage}` : '',
    constructReposNumberQuery(minRepos, maxRepos),
    '&per_page=100',
  );
}
