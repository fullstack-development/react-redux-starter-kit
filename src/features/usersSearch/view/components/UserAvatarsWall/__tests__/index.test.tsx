import React from 'react';
import { render } from 'enzyme';

import { getGithubUserMock } from 'shared/helpers';

import UserAvatarsWall, { IUserAvatarsWallProps } from '../UserAvatarsWall';

const props: IUserAvatarsWallProps = {
  users: Array(10).fill(getGithubUserMock()),
  onAvatarClick: jest.fn(),
};

describe('UserAvatarsWall component', () => {
  const component = render(<UserAvatarsWall {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
