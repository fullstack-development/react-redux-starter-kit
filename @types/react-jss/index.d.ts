declare module 'react-jss' {
  import * as React from "react";
  import { create, GenerateClassName } from 'jss';

  export { default as withTheme, Theme, WithTheme } from 'theming';
  export { default, CSSProperties, WithStyles } from 'react-jss/lib/injectSheet';

  type JSS = ReturnType<typeof create>;

  interface IProviderProps {
    jss: JSS;
    generateClassName: GenerateClassName<any>;
  }

  export class JssProvider extends React.Component<IProviderProps> { }
}


