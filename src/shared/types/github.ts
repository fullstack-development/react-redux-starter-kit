export interface IUserSearchOptions {
  searchBy: 'login' | 'fullname' | 'email' | 'login-email';
  searchType: 'user' | 'org' | 'both';
  reposLanguage?: string;
  minRepos?: number;
  maxRepos?: number;
}
