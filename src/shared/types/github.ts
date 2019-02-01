export interface IUserSearchOptions {
  searchBy: 'login' | 'fullname' | 'email' | 'login-email';
  searchType: 'user' | 'org' | 'both';
  perPage: 30 | 60 | 100;
  reposLanguage?: string;
  minRepos?: number;
  maxRepos?: number;
}
