import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IProfile, IGithubUser, IDetailedGithubUser, IRepository } from 'shared/types/models';
import { IFeatureEntry } from './types/app';

export const makeMockComponent = (componentName: string): any => {
  const Container = () => React.createElement('div');
  Container.displayName = componentName;
  return Container;
};

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

export function makeMockEntry<T extends IFeatureEntry>(
  containers?: IFeatureEntry['containers'],
  actions?: IFeatureEntry['actions'],
  selectors?: IFeatureEntry['selectors'],
): T {
  return {
    containers: new Proxy(containers || {}, {
      get: (target, property: string) => {
        return target[property] || makeMockComponent('Container');
      },
    }),
    actions: new Proxy(actions || {}, {
      get: (target, property: string) => {
        return target[property] || jest.fn();
      },
    }),
    selectors: new Proxy(selectors || {}, {
      get: (target, property: string) => {
        return target[property] || jest.fn();
      },
    }),
  } as T;
}

export const withRouterProps: RouteComponentProps = {
  history: {
    length: 1,
    action: 'PUSH',
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    listen: jest.fn(),
    block: jest.fn(),
    createHref: jest.fn(),
    location: {
      pathname: 'pathname',
      hash: 'hash',
      state: null,
      search: 'search',
    },
  },
  location: {
    pathname: 'pathname',
    hash: 'hash',
    state: null,
    search: 'search',
  },
  match: {
    params: {},
    isExact: true,
    path: 'path',
    url: 'https://the_url.com',
  },
};

export function makeMockEvent(type: string) {
  return new Event(type);
}
