import React from 'react';
import { shallow } from 'enzyme';

import UserAttribute, { IUserAttributeProps } from '../UserAttribute';

const props: IUserAttributeProps = {
  title: 'title',
  URL: 'https://the.url',
  value: 11,
};

describe('UserAttribute component', () => {
  const component = shallow(<UserAttribute {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
