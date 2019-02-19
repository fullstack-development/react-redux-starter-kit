import React from 'react';
import { Omit } from '_helpers';

function withProps<P extends Partial<WP>, WP extends {}>(
  Child: React.ComponentType<P>, props: WP,
): React.StatelessComponent<Omit<P, keyof WP>> {
  const result: React.StatelessComponent<Omit<P, keyof WP>> =
    (childProps: Omit<P, keyof WP>) => <Child {...props} {...childProps as P} />;
  result.displayName = `WithProps(${Child.displayName || Child.name || 'Component'})`;
  return result;
}

export default withProps;
