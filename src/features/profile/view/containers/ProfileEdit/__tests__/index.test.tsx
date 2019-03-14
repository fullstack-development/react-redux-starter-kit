import React from 'react';
import { shallow } from 'enzyme';

import { profile } from 'shared/mocks';

import { ProfileEdit, IProfileEditProps } from '../ProfileEdit';

const props: IProfileEditProps = {
  profile,
  setNotification: jest.fn(),
  saveProfile: jest.fn(),
};

describe('(features/profile) ProfileEdit container', () => {
  const component = shallow(<ProfileEdit {...props} />);

  it('should save profile & set notification on form submit', () => {
    component.prop('onSubmit')(profile);
    expect(props.saveProfile).toHaveBeenCalledWith(props.profile);
    expect(props.setNotification).toHaveBeenCalledTimes(1);
  });
});
