import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';

function makeShallowRenderer<Props>(Component: React.ComponentType<Props>, defaultProps: Props) {
  return (props: Partial<Props> = {}): ShallowWrapper<Props> => (
    shallow(<Component {...defaultProps} {...props} />)
  );
}

function makeMountRenderer<Props>(Component: React.ComponentType<Props>, defaultProps: Props) {
  return (props: Partial<Props> = {}): ReactWrapper<Props> => (
    mount(<Component {...defaultProps} {...props} />)
  );
}

export { makeShallowRenderer, makeMountRenderer };
