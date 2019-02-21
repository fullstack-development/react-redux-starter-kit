import React from 'react';
import { shallow } from 'enzyme';

import ProfileAvatar from '../ProfileAvatar';

describe('ProfileAvatar component', () => {
  it('should match snapshot', () => {
    const component = shallow(<ProfileAvatar size="big" avatarURL="" />);
    expect(component).toMatchSnapshot();
  });
});
