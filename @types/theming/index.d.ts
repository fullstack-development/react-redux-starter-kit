declare module 'theming' {
  import { ConsistentWith } from '_helpers';
  import { Theme } from 'theming/@externals';

  export type Theme = Theme;

  export interface WithTheme {
    theme: Theme;
  }

  export default function withTheme(): <P extends ConsistentWith<P, WithTheme>>(
    component: React.ComponentType<P & WithTheme>,
  ) => React.ComponentClass<P>;
}
