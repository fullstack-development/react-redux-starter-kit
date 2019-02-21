import { IProfile, IGithubUser, IDetailedGithubUser, IRepository } from 'shared/types/models';

export function createContainerMock() {
  return function ContainerMock() {
    return null;
  } as any;
}

export function getProfileMock(): IProfile {
  return {
    age: 100,
    nickname: 'Nickname',
    name: 'Name name',
    bio: 'profile bio',
    avatarURL: 'https://the-url.com',
  };
}

export function getGithubUserMock(): IGithubUser {
  return {
    id: 1,
    username: 'username',
    avatarURL: 'http://the-url.com',
    htmlURL: 'http://the-url.com',
  };
}

export function getDetailedGithubUserMock(): IDetailedGithubUser {
  return {
    ...getGithubUserMock(),
    followersNumber: 12,
    followingNumber: 12,
    reposNumber: 12,
    realName: 'The real name',
    location: 'Nowhere',
  };
}

export function getRepositoryMock(): IRepository {
  return {
    id: 1,
    openIssuesNumber: 1,
    starsNumber: 1,
    forksNumber: 1,
    description: 'description',
    name: 'name',
    htmlURL: 'http://the-url.com',
    language: 'en',
    updatedAt: '05/05/2005',
    owner: getGithubUserMock(),
  };
}
// TODO: моки?
