import React from 'react';
import { shallow } from 'enzyme';
import * as R from 'ramda';

import { githubUser } from 'shared/mocks';

import UsersAvatarsWall, { IUsersAvatarsWallProps } from '../UsersAvatarsWall';

const props: IUsersAvatarsWallProps = {
  users: Array(10).fill(githubUser),
  onAvatarClick: jest.fn(),
};

describe('(features/usersSearch) UsersAvatarsWall component', () => {
  const component = shallow(<UsersAvatarsWall {...props} />);
  const avatars = component.find('.users-avatars-wall__avatar');

  it('should render all users avatars', () => {
    expect(avatars.length).toEqual(props.users.length);
  });

  it('should call onAvatarClick with user data on avatar click', () => {
    avatars.at(0).simulate('click');
    expect(props.onAvatarClick).toHaveBeenCalledWith(props.users[0]);
  });

  it('should show preloader initially', () => {
    expect(component.find('Preloader').prop('isShown')).toBe(true);
  });

  it('should hide preloader when all avatars are loaded', () => {
    component.find('img').forEach(x => x.simulate('load'));
    expect(component.find('Preloader').prop('isShown')).toBe(false);
  });

  it('should not show preloader if new users array with the same avatar urls is passed', () => {
    component.setProps({ ...props, users: R.clone(props.users) });
    expect(component.find('Preloader').prop('isShown')).toBe(false);
  });

  it('should show preloader when a user with new avatar url is added', () => {
    const newUser = { ...props.users[0], avatarURL: 'https://new-amazing-url.net'};
    component.setProps({ ...props, users: [...props.users, newUser] });
    expect(component.find('Preloader').prop('isShown')).toBe(true);
  });

  it('should not render with no users', () => {
    component.setProps({...props, users: []});
    expect(component.html()).toBeNull();
  });
});
