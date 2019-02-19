declare module 'react-jss' {
  import React from 'react';
  import { create, GenerateClassName } from 'jss';

  export { default as withTheme, Theme, WithTheme } from 'theming';
  export { default, CSSProperties, WithStyles } from 'react-jss/lib/injectSheet';

  export type JSS = ReturnType<typeof create>;

  interface IProviderProps {
    jss?: JSS;
    generateClassName?: GenerateClassName<any>;
    registry?: SheetsRegistry;
    disableStylesGeneration?: boolean;
  }

  export class JssProvider extends React.Component<IProviderProps> { }

  export class SheetsRegistry {
    public toString(): string;
  }
}
