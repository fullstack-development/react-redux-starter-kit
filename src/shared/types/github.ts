export interface IUserSearchOptions {
  searchBy: 'login' | 'fullname' | 'email' | 'login-email';
  searchType: 'user' | 'org' | 'both';
  minRepos?: number;
  maxRepos?: number;
}
