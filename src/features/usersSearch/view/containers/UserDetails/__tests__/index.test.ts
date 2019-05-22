import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { detailedGithubUser } from 'shared/mocks';
import { Preloader } from 'shared/view/elements';
import { Dialog } from 'shared/view/components';

import { UserDetails, IUserDetailsProps } from '../UserDetails';

const props: IUserDetailsProps = {
  userDetails: detailedGithubUser,
  isLoadUserDetailsRequesting: true,
  loadUserDetails: jest.fn(),
  onClose: jest.fn(),
  username: 'the user',
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(UserDetails, props);

describe('(features/usersSearch) UserDetails container', () => {
  it('should show preloader if user details are requesting', () => {
    const component = getComponent();
    expect(component.find(Preloader).prop('isShown')).toBe(true);
  });

  it('should hide preloader if user details are not requesting', () => {
    const component = getComponent({ isLoadUserDetailsRequesting: false });
    expect(component.find(Preloader).prop('isShown')).toBe(false);
  });

  it('should call loadUserDetails with username on dialog enter', () => {
    const loadUserDetails = jest.fn();
    const component = getComponent({ loadUserDetails });
    component.find(Dialog).prop('onEnter')!(document.createElement('div'), false);
    expect(loadUserDetails).toHaveBeenCalledWith(props.username);
  });

  it('should call onClose on dialog close', () => {
    const onClose = jest.fn();
    const component = getComponent({ onClose });
    component.find(Dialog).prop('onClose')();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
