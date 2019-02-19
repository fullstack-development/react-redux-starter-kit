import * as React from 'react';
import { shallow } from 'enzyme';

import ProfileAvatar from '../ProfileAvatar';

describe('ProfileAvatar component', () => {
  it('should match snapshot', () => {
    const componentBig = shallow(<ProfileAvatar size="big" avatarURL="" />);
    const componentSmall = shallow(<ProfileAvatar size="small" avatarURL="" />);
    expect(componentBig).toMatchSnapshot();
    expect(componentSmall).toMatchSnapshot();
  });
});
