import reducer from './reducers';
import * as actionCreators from './actionCreators';
import * as selectors from './selectors';
<% if (reduxConfig && reduxConfig.withSaga) { -%>
import { getSaga } from './sagas';
<% } -%>

export { reducer, selectors, actionCreators<%= (reduxConfig && reduxConfig.withSaga) ? ', getSaga' : '' %> };
