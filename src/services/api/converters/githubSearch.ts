import { IServerUser, IServerUserDetails, IUser, IUserDetails } from 'shared/types/models';

export function convertUser(user: IServerUser): IUser {
  return {
    id: user.id,
    username: user.login,
    avatarURL: user.avatar_url,
    htmlURL: user.html_url,
  };
}

export function convertUserDetails(details: IServerUserDetails): IUserDetails {
  return {
    ...convertUser(details),
    followersNumber: details.followers,
    followingNumber: details.following,
    reposNumber: details.public_repos,
    realName: details.name,
    location: details.location,
  };
}
