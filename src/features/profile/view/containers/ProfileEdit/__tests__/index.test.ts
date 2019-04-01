import { Form } from 'react-final-form';

import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { profile } from 'shared/mocks';

import { ProfileEdit, IProfileEditProps } from '../ProfileEdit';

const props: IProfileEditProps = {
  profile,
  setNotification: jest.fn(),
  saveProfile: jest.fn(),
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(ProfileEdit, props);

describe('(features/profile) ProfileEdit container', () => {
  it('should save profile & set notification on form submit', () => {
    const saveProfile = jest.fn();
    const setNotification = jest.fn();
    const component = getComponent({ saveProfile, setNotification });
    component.find(Form).prop('onSubmit')(profile);
    expect(saveProfile).toHaveBeenCalledWith(props.profile);
    expect(setNotification).toHaveBeenCalledTimes(1);
  });
});
