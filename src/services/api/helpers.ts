import { IUserSearchOptions } from 'shared/types/github';

export function constructUserSearchQuery(queryString: string, options: IUserSearchOptions) {
  const { searchBy } = options;
  return queryString.concat(
    searchBy === 'login-email' ? '' : `+in:${searchBy}`,
    '&per_page=100',
  );
}
