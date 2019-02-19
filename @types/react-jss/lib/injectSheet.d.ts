
declare module 'react-jss/lib/injectSheet' {
  import React from 'react';
  import CSS from 'csstype';
  import { WithTheme, Theme } from 'theming';
  import { ConsistentWith, Overwrite } from '_helpers';

  type BaseCSSProps = CSS.Properties<number | string>;

  type ExtendedCSSProperties = {
    [key in keyof BaseCSSProps]: BaseCSSProps[key] | ((props: any) => BaseCSSProps[key]);
  } & {
    composes?: string | string[];
  };

  export interface CSSProperties extends ExtendedCSSProperties {
    // Allow pseudo selectors and media queries
    [k: string]: ExtendedCSSProperties[keyof ExtendedCSSProperties] | ExtendedCSSProperties | CSSProperties;
  }

  /**
   * This is basically the API of JSS. It defines a Map<string, CSS>,
   * where
   *
   * - the `keys` are the class (names) that will be created
   * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
   */
  export type StyleRules<ClassKey extends string = string> = Record<ClassKey, CSSProperties | ((props: any) => BaseCSSProps)>;

  export type StyleRulesCallback<ClassKey extends string = string> = (
    theme: Theme,
  ) => StyleRules<ClassKey>;

  export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

  export type WithStyles<T extends string | StyleRules | StyleRulesCallback> = Partial<WithTheme> & {
    classes: ClassNameMap<
      T extends string ? T :
      T extends StyleRulesCallback<infer K> ? K :
      T extends StyleRules<infer K> ? K :
      never
    >;
  };

  export interface StyledComponentProps<ClassKey extends string = string> {
    classes?: Partial<ClassNameMap<ClassKey>>;
    innerRef?: React.Ref<any> | React.RefObject<any>;
  }

  export default function withStyles<ClassKey extends string>(
    style: StyleRulesCallback<ClassKey> | StyleRules<ClassKey>,
  ): {
    <P extends ConsistentWith<P, StyledComponentProps<ClassKey>>>(
      component?: React.ComponentType<P & WithStyles<ClassKey>>,
    ): React.ComponentType<Overwrite<P, StyledComponentProps<ClassKey>>>;
  };
}
