<% if (reduxConfig) { -%>
import * as namespace from './namespace';

export { namespace };
<% } -%>
export { Entry } from './entry';
export { loadEntry } from './loader';
