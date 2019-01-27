import { IServerUser } from 'shared/types/models';

export function convertUser(user: IServerUser) {
  return {
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
