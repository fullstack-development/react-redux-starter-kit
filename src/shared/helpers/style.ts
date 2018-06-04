import { CSSProperties } from '@material-ui/core/styles/withStyles';

type ExtendedCSSProperties = {
  [key in keyof CSSProperties]: CSSProperties[key] | ((props: any) => CSSProperties[key]) | ExtendedCSSProperties;
};

export function rule(props: ExtendedCSSProperties): CSSProperties {
  return props as CSSProperties;
}
