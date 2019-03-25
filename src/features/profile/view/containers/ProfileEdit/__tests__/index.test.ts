import { Form } from 'react-final-form';

import { makeShallowRenderer } from 'shared/helpers';
import { profile } from 'shared/mocks';

import { ProfileEdit, IProfileEditProps } from '../ProfileEdit';

const props: IProfileEditProps = {
  profile,
  setNotification: jest.fn(),
  saveProfile: jest.fn(),
};

const getComponent = makeShallowRenderer(ProfileEdit, props);

describe('(features/profile) ProfileEdit container', () => {
  it('should save profile & set notification on form submit', () => {
    const component = getComponent();
    component.find(Form).prop('onSubmit')(profile);
    expect(props.saveProfile).toHaveBeenCalledWith(props.profile);
    expect(props.setNotification).toHaveBeenCalledTimes(1);
  });
});
