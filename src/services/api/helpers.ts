import { IUsersSearchFilters, IRepositoriesSearchFilters } from 'shared/types/githubSearch';

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

export function constructUsersSearchQuery(queryString: string, filters: IUsersSearchFilters, page: number) {
  const { searchBy, searchFor, minRepos, maxRepos, reposLanguage, perPage } = filters;
  return queryString.concat(
    searchBy !== 'username-email' ? `+in:${searchBy}` : '',
    searchFor !== 'both' ? `+type:${searchFor}` : '',
    optionalParam('language', reposLanguage),
    constructReposNumberQuery(minRepos, maxRepos),
    `&per_page=${perPage}`,
    `&page=${page}`,
  );
}

export function constructRepositoriesSearchQuery(
  queryString: string, filters: IRepositoriesSearchFilters, page: number,
) {
  const { starsNumber, forksNumber, owner, language } = filters;
  return queryString.concat(
    forksNumber !== void 0 ? `+forks:>${forksNumber}` : '',
    starsNumber !== void 0 ? `+stars:>${starsNumber}` : '',
    optionalParam('user', owner),
    optionalParam('language', language),
    `&page=${page}`,
  );
}

function optionalParam(name: string, value?: string) {
  return value ? `+${name}:${value}` : '';
}

/*
  header format (requesting page=7):
  <https://api.github.com/search/users?q=asd&per_page=30&page=6>; rel="prev",
  <https://api.github.com/search/users?q=asd&per_page=30&page=8>; rel="next",
  <https://api.github.com/search/users?q=asd&per_page=30&page=34>; rel="last",
  <https://api.github.com/search/users?q=asd&per_page=30&page=1>; rel="first"
*/
export function getTotalPagesFromLinkHeader(link?: string): number {
  if (link === void 0) {
    return 0;
  }

  const lastPageMatch = link.match(/&page=(\d+)>; rel="last"/);
  if (lastPageMatch) {
    return Number(lastPageMatch[1]);
  }

  const prevPageMatch = link.match(/&page=(\d+)>; rel="prev"/);
  if (prevPageMatch) {
    return Number(prevPageMatch[1]) + 1;
  }

  console.error(`Error while trying to get total pages from ${link}`);
  return 0;
}

export function getTotalResults(totalFromResponse: number) {
  const maxTotal = 1000; // max results api can give https://developer.github.com/v3/search/
  return Math.min(totalFromResponse, maxTotal);
}
