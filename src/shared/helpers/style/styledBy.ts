export function styledBy<Props extends {[key in K]: string}, K extends keyof Props, V extends string | number>(
  property: K, mapping: Record<Props[K], V>,
): (props: Props) => V;
export function styledBy<Props extends {[key in K]?: string}, K extends keyof Props, V extends string | number>(
  property: K, mapping: Record<NonNullable<Props[K]>, V>, defaultProp: NonNullable<Props[K]>,
): (props: Props) => V;
export function styledBy<Props extends {[key in K]?: string}, K extends keyof Props, V extends string | number>(
  property: K, mapping: Record<NonNullable<Props[K]>, V>, defaultProp?: NonNullable<Props[K]>,
): (props: Props) => V {
  return (props: Props) => mapping[(props[property] || defaultProp) as NonNullable<Props[K]>];
}
