export interface ISearchUserResponse {
  items: IServerUser[];
  total_count: number;
}

// TODO: think about github types placement

export interface IServerUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface IServerUserDetails extends IServerUser {
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

export interface IUserDetails extends IUser {
  followersNumber: number;
  followingNumber: number;
  reposNumber: number;
  realName: string;
  location: null | string;
}
