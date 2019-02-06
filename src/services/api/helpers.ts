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

export function constructUserSearchQuery(queryString: string, options: IUserSearchOptions, page: number = 1) {
  const { searchBy, searchType, minRepos, maxRepos, reposLanguage, perPage } = options;
  return queryString.concat(
    searchBy !== 'username-email' ? `+in:${searchBy}` : '',
    searchType !== 'both' ? `+type:${searchType}` : '',
    reposLanguage ? `+language:${reposLanguage}` : '',
    constructReposNumberQuery(minRepos, maxRepos),
    `&per_page=${perPage}`,
    `&page=${page}`,
  );
}

/*
  header format (requesting page=7):
  <https://api.github.com/search/users?q=asd&per_page=30&page=6>; rel="prev",
  <https://api.github.com/search/users?q=asd&per_page=30&page=8>; rel="next",
  <https://api.github.com/search/users?q=asd&per_page=30&page=34>; rel="last",
  <https://api.github.com/search/users?q=asd&per_page=30&page=1>; rel="first"
*/
export function getTotalPagesFromLinkHeader(link?: string): number {
  if (link !== void 0) {
    const lastPageMatch = link.match(/&page=(\d+)>; rel="last"/);
    if (lastPageMatch) {
      return Number(lastPageMatch[1]);
    } else {
      const prevPageMatch = link.match(/&page=(\d+)>; rel="prev"/);
      if (prevPageMatch) {
        return Number(prevPageMatch[1]) + 1;
      } else {
        console.error(`Error while trying to get total pages from ${link}`);
      }
    }
  }
  return 1;
}
