import * as R from 'ramda';

import { makeShallowRenderer } from 'shared/helpers';
import { githubUser } from 'shared/mocks';
import { Preloader } from 'shared/view/elements';

import UsersAvatarsWall, { IUsersAvatarsWallProps } from '../UsersAvatarsWall';

const props: IUsersAvatarsWallProps = {
  users: Array(10).fill(githubUser),
  onAvatarClick: jest.fn(),
};

const getComponent = makeShallowRenderer(UsersAvatarsWall, props);

describe('(features/usersSearch) UsersAvatarsWall component', () => {
  it('should render all users avatars', () => {
    const component = getComponent();
    const avatars = component.find('.users-avatars-wall__avatar');
    expect(avatars.length).toEqual(props.users.length);
  });

  it('should call onAvatarClick with user data on avatar click', () => {
    const onAvatarClick = jest.fn();
    const component = getComponent({ onAvatarClick });
    const avatars = component.find('.users-avatars-wall__avatar');
    avatars.at(0).simulate('click');
    expect(onAvatarClick).toHaveBeenCalledWith(props.users[0]);
  });

  it('should show preloader initially', () => {
    const component = getComponent();
    expect(component.find(Preloader).prop('isShown')).toBe(true);
  });

  it('should hide preloader when all avatars are loaded', () => {
    const component = getComponent();
    component.find('img').forEach(x => x.simulate('load'));
    expect(component.find(Preloader).prop('isShown')).toBe(false);
  });

  it('should not show preloader if new users array with the same avatar urls is passed', () => {
    const component = getComponent();
    component.find('img').forEach(x => x.simulate('load'));
    component.setProps({ users: R.clone(props.users) });
    expect(component.find(Preloader).prop('isShown')).toBe(false);
  });

  it('should show preloader when a user with new avatar url is added', () => {
    const component = getComponent();
    const newUser = { ...props.users[0], avatarURL: 'https://new-amazing-url.net'};
    component.setProps({ users: [...props.users, newUser] });
    expect(component.find(Preloader).prop('isShown')).toBe(true);
  });

  it('should not render with no users', () => {
    const component = getComponent({ users: [] });
    expect(component.html()).toBeNull();
  });
});
