import React from 'react';
import { shallow } from 'enzyme';

import { githubUser } from 'shared/mocks';

import UsersAvatarsWall, { IUsersAvatarsWallProps } from '../UsersAvatarsWall';

const props: IUsersAvatarsWallProps = {
  users: Array(10).fill(githubUser),
  onAvatarClick: jest.fn(),
};

describe('UsersAvatarsWall component', () => {
  const component = shallow(<UsersAvatarsWall {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  const avatars = component.find('.users-avatars-wall__avatar');
  it('should display all users', () => {
    expect(avatars.length).toEqual(props.users.length);
  });

  it('should call onAvatarClick on avatar click', () => {
    avatars.at(0).simulate('click');
    expect(props.onAvatarClick).toHaveBeenCalledTimes(1);
  });
});
