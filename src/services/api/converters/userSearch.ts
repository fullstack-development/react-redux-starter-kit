import { IUser, IDetailedUser } from 'shared/types/models';
import { IServerUser, IDetailedServerUser } from '../types';

export function convertUser(user: IServerUser): IUser {
  return {
    id: user.id,
    username: user.login,
    avatarURL: user.avatar_url,
    htmlURL: user.html_url,
  };
}

export function convertUserDetails(details: IDetailedServerUser): IDetailedUser {
  return {
    ...convertUser(details),
    followersNumber: details.followers,
    followingNumber: details.following,
    reposNumber: details.public_repos,
    realName: details.name,
    location: details.location,
  };
}
