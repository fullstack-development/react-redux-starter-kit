import * as NS from '../namespace';

export const initial: NS.IReduxState = {
<% (reduxConfig ? reduxConfig.parts : []).forEach(part => { -%>
  <%= part %>: {

  },
<% }) -%>
};
