import React from 'react';
import { mount } from 'enzyme';

import { getProfileMock } from 'shared/helpers';

import { ProfileEdit, IProfileEditProps } from '../ProfileEdit';

const props: IProfileEditProps = {
  profile: getProfileMock(),
  setNotification: jest.fn(),
  saveProfile: jest.fn(),
};

describe('ProfileEdit component', () => {
  const component = mount(<ProfileEdit {...props} />);

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should save profile & set notification on submit', () => {
    component.find('form').simulate('submit');
    expect(props.setNotification).toHaveBeenCalledTimes(1);
    expect(props.saveProfile).toHaveBeenCalledTimes(1);
  });
});
