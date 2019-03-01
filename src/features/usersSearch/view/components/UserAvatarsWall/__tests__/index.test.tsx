import React from 'react';
import { shallow } from 'enzyme';

import { githubUser } from 'shared/mocks';

import UserAvatarsWall, { IUserAvatarsWallProps } from '../UserAvatarsWall';

const props: IUserAvatarsWallProps = {
  users: Array(10).fill(githubUser),
  onAvatarClick: jest.fn(),
};

describe('UserAvatarsWall component', () => {
  const component = shallow(<UserAvatarsWall {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
