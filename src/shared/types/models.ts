export interface IProfile {
  age: number;
  nickname: string;
  name: string;
  bio: string;
  avatarURL: string;
}

export interface IRepository {
  id: number;
  openIssuesNumber: number;
  starsNumber: number;
  forksNumber: number;
  description: string;
  name: string;
  htmlURL: string;
  language: string;
  updatedAt: string;
  owner: IGithubUser;
}

export interface IGithubUser {
  id: number;
  username: string;
  avatarURL: string;
  htmlURL: string;
}

export interface IDetailedGithubUser extends IGithubUser {
  followersNumber: number;
  followingNumber: number;
  reposNumber: number;
  realName: string;
  location: null | string;
}
