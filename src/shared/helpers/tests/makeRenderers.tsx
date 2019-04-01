import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';

export function makeShallowRenderer<Props, State>(
  Component: React.ComponentClass<Props, State> | React.FunctionComponent<Props>, defaultProps: Props,
) {
  return (props: Partial<Props> = {}): ShallowWrapper<Props, State> => (
    shallow(<Component {...defaultProps} {...props} />)
  );
}

export function makeMountRenderer<Props, State>(
  Component: React.ComponentClass<Props, State> | React.FunctionComponent<Props>, defaultProps: Props,
) {
  return (props: Partial<Props> = {}): ReactWrapper<Props, State> => (
    mount(<Component {...defaultProps} {...props} />)
  );
}
