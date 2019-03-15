import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Form } from 'react-final-form';

import { profile } from 'shared/mocks';

import { ProfileEdit, IProfileEditProps } from '../ProfileEdit';

const props: IProfileEditProps = {
  profile,
  setNotification: jest.fn(),
  saveProfile: jest.fn(),
};

describe('(features/profile) ProfileEdit container', () => {
  let component: ShallowWrapper<IProfileEditProps>;
  beforeEach(() => component = shallow(<ProfileEdit {...props} />));

  it('should save profile & set notification on form submit', () => {
    component.find(Form).prop('onSubmit')(profile);
    expect(props.saveProfile).toHaveBeenCalledWith(props.profile);
    expect(props.setNotification).toHaveBeenCalledTimes(1);
  });
});
