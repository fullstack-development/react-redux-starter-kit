export interface ISearchUserResponse {
  items: IServerUser[];
  total_count: number;
}

export interface IServerUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface IDetailedServerUser extends IServerUser {
  followers: number;
  following: number;
  public_repos: number;
  name: string;
  location: null | string;
}

export interface IUser {
  id: number;
  username: string;
  avatarURL: string;
  htmlURL: string;
}

export interface IDetailedUser extends IUser {
  followersNumber: number;
  followingNumber: number;
  reposNumber: number;
  realName: string;
  location: null | string;
}

export interface IUserSearchResults {
  totalPages: number;
  users: IUser[];
}
