declare module 'theming' {
  import { ConsistentWith } from '_helpers';
  import { Theme as MaterialTheme } from '@material-ui/core/styles';

  export type Theme = MaterialTheme;

  export interface WithTheme {
    theme: Theme;
  }

  export default function withTheme(): <P extends ConsistentWith<P, WithTheme>>(
    component: React.ComponentType<P & WithTheme>,
  ) => React.ComponentClass<P>;
}
