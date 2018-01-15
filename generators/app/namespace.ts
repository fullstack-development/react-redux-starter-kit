export interface IBaseConfig {
  featureName: string;
  isLazy: boolean;
  featureParts: FeaturePart[];
}

export interface IUserAnswers extends IBaseConfig {
  reduxConfig: IReduxConfig | null;
  viewConfig: IViewConfig | null;
}

export type FeaturePart = 'redux' | 'view';

export interface IViewConfig {
  parts: ViewPart[];
}

export type ViewPart = 'containers' | 'components';

export interface IReduxConfig {
  withSaga: boolean;
  parts: ReduxPart[];
}

export type ReduxPart = 'communication' | 'edit' | 'data' | 'ui';

export interface ICreateFileConfig {
  templateUrl: string;
  newFileUrl: string;
  context?: object;
}
