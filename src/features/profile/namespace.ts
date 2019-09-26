import {
  IProfile,
  IDetailedGithubUser,
  IRepository,
} from 'shared/types/models';
import { IAction } from 'shared/types/redux';

export interface IReduxState {
  edit: {
    profile: IProfile;
  };
  users: {
    saved: IDetailedGithubUser[];
  };
  repos: {
    saved: IRepository[];
  };
}

export type IProfileEditFormFields = IProfile;

export type ISaveProfile = IAction<
  'PROFILE:SAVE_PROFILE',
  IProfileEditFormFields
>;
export type ISaveUser = IAction<'PROFILE:SAVE_USER', IDetailedGithubUser>;
export type IRemoveUser = IAction<'PROFILE:REMOVE_USER', number>;

export type IAction = ISaveProfile | ISaveUser | IRemoveUser;
