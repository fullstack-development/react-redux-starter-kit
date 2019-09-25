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

export type IAction = ISaveProfile;
