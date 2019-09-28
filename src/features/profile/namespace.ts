import {
  IProfile,
  ISavedGithubUser,
  ISavedRepository,
} from 'shared/types/models';
import { IAction } from 'shared/types/redux';

export interface IReduxState {
  edit: {
    profile: IProfile;
  };
  users: {
    saved: ISavedGithubUser[];
  };
  repos: {
    saved: ISavedRepository[];
  };
}

export type IProfileEditFormFields = IProfile;

export type ISaveProfile = IAction<
  'PROFILE:SAVE_PROFILE',
  IProfileEditFormFields
>;
export type ISaveUser = IAction<'PROFILE:SAVE_USER', ISavedGithubUser>;
export type IRemoveUser = IAction<'PROFILE:REMOVE_USER', number>;
export type ISaveRepo = IAction<'PROFILE:SAVE_REPO', ISavedRepository>;
export type IRemoveRepo = IAction<'PROFILE:REMOVE_REPO', number>;

export type IAction = ISaveProfile | ISaveUser | IRemoveUser;
