import { <%= (reduxConfig && reduxConfig.parts.includes('communication')) ? 'ICommunication, ' : '' %>IPlainAction } from 'shared/types/redux';

export interface IReduxState {
<% (reduxConfig ? reduxConfig.parts : []).forEach(part => { -%>
  <%= part %>: {

  };
<% }) -%>
}

export type ISomeAction = IPlainAction<'FEATURE_NAME:SOME_ACTION'>;

export type Action =
  | ISomeAction;
