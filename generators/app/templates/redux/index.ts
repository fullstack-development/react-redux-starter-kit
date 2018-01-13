import reducer from './reducers';
import * as actions from './actions';
import * as selectors from './selectors';
<% if (reduxConfig && reduxConfig.withSaga) { -%>
import { getSaga } from './sagas';
<% } -%>

export { reducer, selectors, actions<%= (reduxConfig && reduxConfig.withSaga) ? ', getSaga' : '' %> };
