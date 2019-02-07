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
