<% if (reduxConfig) { -%>
import * as namespace from './namespace';
import { actions, selectors, reducer<%= (reduxConfig.withSaga) ? ', getSaga' : '' %> } from './redux';
import { IReduxEntry } from 'core/types';

export { namespace, selectors, actions };
<% } -%>
<% if (viewConfig && viewConfig.parts.includes('containers')) { -%>
export * from './view/containers';
<% } -%>
<% if (reduxConfig) { -%>

export const reduxEntry: IReduxEntry = {
  reducers: { <%= featureName %>: reducer },
<% if (reduxConfig && reduxConfig.withSaga) { -%>
  sagas: [getSaga],
<% } -%>
};
<% } -%>