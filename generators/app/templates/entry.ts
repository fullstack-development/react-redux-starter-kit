import { getFeatureEntry } from 'shared/helpers';

<% if (viewConfig && viewConfig.parts.includes('containers')) { -%>
import * as containers from './view/containers';
<% } -%>
<% if (reduxConfig) { -%>
import { actions, selectors, reducer<%= (reduxConfig.withSaga) ? ', getSaga' : '' %> } from './redux';
<% } -%>

const entry = getFeatureEntry({
<% if (viewConfig && viewConfig.parts.includes('containers')) { -%>
  containers,
<% } -%>
<% if (reduxConfig) { -%>
  actions,
  selectors,
  reduxEntry: {
    reducers: { <%= featureName %>: reducer },
<% if (reduxConfig && reduxConfig.withSaga) { -%>
    sagas: [getSaga],
<% } -%>
  },
<% } -%>
});

type Entry = typeof entry;

export { Entry, entry };
