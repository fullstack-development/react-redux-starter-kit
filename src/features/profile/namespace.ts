import { IProfile } from 'shared/types/models';
import { IAction } from 'shared/types/redux';
import { IDetailedGithubUser, IRepository } from 'shared/types/models';

export interface IReduxState {
  edit: {
    profile: IProfile;
  };
  users: {
    saved: Array<IDetailedGithubUser>;
  };
  repos: {
    saved: Array<IRepository>;
  };
}

export type IProfileEditFormFields = IProfile;

export type ISaveProfile = IAction<
  'PROFILE:SAVE_PROFILE',
  IProfileEditFormFields
>;

export type IAction = ISaveProfile;
