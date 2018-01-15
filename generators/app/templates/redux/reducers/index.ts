import { combineReducers } from 'redux';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

<% (reduxConfig ? reduxConfig.parts : []).forEach(part => { -%>
import { <%= part %>Reducer } from './<%= part %>';
<% }) -%>

export default combineReducers<NS.IReduxState>({
<% (reduxConfig ? reduxConfig.parts : []).forEach(part => { -%>
  <%= part %>: <%= part %>Reducer,
<% }) -%>
} as ReducersMap<NS.IReduxState>);
