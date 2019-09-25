import { IProfile } from 'shared/types/models';
import { IAction } from 'shared/types/redux';

export interface IReduxState {
  edit: {
    profile: IProfile;
  };
}

export type IProfileEditFormFields = IProfile;

export type ISaveProfile = IAction<'PROFILE:SAVE_PROFILE', IProfileEditFormFields>;

export type IAction = ISaveProfile;
