import { IServerUser, IServerUserDetails, IUser, IUserDetails } from 'shared/types/models';

export function convertUser(user: IServerUser): IUser {
  return {
    id: user.id,
    login: user.login,
    avatarURL: user.avatar_url,
    followersURL: user.followers_url,
    followingURL: user.following_url,
    htmlURL: user.html_url,
    organizationsURL: user.organizations_url,
    reposURL: user.repos_url,
    starredURL: user.starred_url,
    subscriptionsURL: user.subscriptions_url,
    score: user.score,
  };
}

export function convertUserDetails(details: IServerUserDetails): IUserDetails {
  return {
    ...convertUser(details),
    followers: details.followers,
    following: details.following,
    publicRepos: details.public_repos,
    name: details.name,
    type: details.type,
    location: details.location,
  };
}
