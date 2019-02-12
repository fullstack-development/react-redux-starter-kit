export interface IUserSearchOptions {
  searchBy: 'login' | 'fullname' | 'email' | 'username-email';
  searchType: 'user' | 'org' | 'both';
  perPage: 30 | 50 | 100;
  reposLanguage?: string;
  minRepos?: number;
  maxRepos?: number;
}
