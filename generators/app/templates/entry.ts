import { getFeatureEntry } from 'shared/helpers/makeFeatureEntry';

<% if (viewConfig && viewConfig.parts.includes('containers')) { -%>
import * as containers from './view/containers';
<% } -%>
<% if (reduxConfig) { -%>
import { actions, selectors, reducer<%= (reduxConfig.withSaga) ? ', getSaga' : '' %> } from './redux';
<% } -%>

const entry = getFeatureEntry(
  <%= (viewConfig && viewConfig.parts.includes('containers')) ? 'containers' : 'null' %>, <%= reduxConfig ? 'actions, selectors,' : 'null, null,' %>
<% if (reduxConfig) { -%>
  {
    reducers: { <%= featureName %>: reducer },
<% if (reduxConfig && reduxConfig.withSaga) { -%>
    sagas: [getSaga],
<% } -%>
  },
<% } -%>
);

type Entry = typeof entry;

export { Entry, entry };
