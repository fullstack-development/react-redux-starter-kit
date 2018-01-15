<% (reduxConfig ? reduxConfig.parts : []).forEach(part => { -%>
export * from './<%= part %>';
<% }) %>