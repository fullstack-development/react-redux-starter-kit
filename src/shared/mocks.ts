import { IProfile, IGithubUser, IDetailedGithubUser, IRepository } from 'shared/types/models';

export const Container: any = () => null;

export const profile: IProfile = {
  age: 100,
  nickname: 'Nickname',
  name: 'Name name',
  bio: 'profile bio',
  avatarURL: 'https://the-url.com',
};

export const githubUser: IGithubUser = {
  id: 1,
  username: 'username',
  avatarURL: 'http://the-url.com',
  htmlURL: 'http://the-url.com',
};

export const detailedGithubUser: IDetailedGithubUser = {
  ...githubUser,
  followersNumber: 12,
  followingNumber: 12,
  reposNumber: 12,
  realName: 'The real name',
  location: 'Nowhere',
};

export const repository: IRepository = {
  id: 1,
  openIssuesNumber: 1,
  starsNumber: 1,
  forksNumber: 1,
  description: 'description',
  name: 'name',
  htmlURL: 'http://the-url.com',
  language: 'en',
  updatedAt: '05/05/2005',
  owner: githubUser,
};
