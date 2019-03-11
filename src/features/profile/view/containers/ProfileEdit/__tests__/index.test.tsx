import React from 'react';
import { mount } from 'enzyme';

import { profile } from 'shared/mocks';

import { ProfileEdit, IProfileEditProps } from '../ProfileEdit';

const props: IProfileEditProps = {
  profile,
  setNotification: jest.fn(),
  saveProfile: jest.fn(),
};

describe('(features/profile) ProfileEdit container', () => {
  const component = mount(<ProfileEdit {...props} />);

  it('should save profile & set notification on submit', () => {
    component.find('form').simulate('submit');
    expect(props.setNotification).toHaveBeenCalledTimes(1);
    expect(props.saveProfile).toHaveBeenCalledWith(props.profile);
  });
});
