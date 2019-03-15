import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

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
};

describe('(features/usersSearch) UserDetails container', () => {
  let component: ShallowWrapper<IUserDetailsProps>;
  beforeEach(() => component = shallow(<UserDetails {...props} />));

  it('should show preloader if user details are requesting', () => {
    expect(component.find(Preloader).prop('isShown')).toBe(true);
  });

  it('should hide preloader if user details are not requesting', () => {
    component.setProps({ isLoadUserDetailsRequesting: false });
    expect(component.find(Preloader).prop('isShown')).toBe(false);
  });

  it('should call loadUserDetails with username on dialog enter', () => {
    component.find(Dialog).prop('onEnter')!(document.createElement('div'), false);
    expect(props.loadUserDetails).toHaveBeenCalledWith(props.username);
  });

  it('should call onClose on dialog close', () => {
    component.find(Dialog).prop('onClose')();
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
