export interface IUsersSearchOptions {
  searchBy: 'login' | 'fullname' | 'email' | 'username-email';
  searchType: 'user' | 'org' | 'both';
  perPage: 30 | 50 | 100;
  reposLanguage?: string;
  minRepos?: number;
  maxRepos?: number;
}

// TODO: почему это здесь, а юзеры и репы в моделс?

export interface IRepositoriesSearchOptions {
  starsNumber?: string;
  forksNumber?: string;
  language?: string;
  owner?: string;
}
