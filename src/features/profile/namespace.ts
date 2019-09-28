import {
  IProfile,
  IRepository,
  ISavedGithubUser,
  ISavedRepository,
} from 'shared/types/models';
import {
  IAction,
  IPlainAction,
  IPlainFailAction,
  ICommunication,
} from 'shared/types/redux';

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
  communication: {
    loadRepository: ICommunication;
  };
  data: {
    repository: null | IRepository;
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

export type IGetRepositoryPayload = number;
export type IGetRepositorySuccessPayload = IRepository;
export type IGetRepository = IAction<
  'PROFILE:GET_REPOSITORY',
  IGetRepositoryPayload
>;
export type IGetRepositorySuccess = IAction<
  'PROFILE:GET_REPOSITORY_SUCCESS',
  IGetRepositorySuccessPayload
>;
export type IGetRepositoryFail = IPlainFailAction<
  'PROFILE:GET_REPOSITORY_FAIL'
>;
export type IResetRepository = IPlainAction<'PROFILE:RESET_REPOSITORY'>;
export type IAction =
  | ISaveProfile
  | ISaveUser
  | IRemoveUser
  | IRemoveRepo
  | IGetRepository
  | IGetRepositorySuccess
  | IGetRepositoryFail
  | IResetRepository;
