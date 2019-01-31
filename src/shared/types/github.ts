export interface IUserSearchOptions {
  searchBy: 'login' | 'fullname' | 'email' | 'login-email';
  minRepos?: number;
  maxRepos?: number;
}
