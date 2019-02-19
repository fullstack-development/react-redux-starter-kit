import * as React from 'react';
import { mount } from 'enzyme';

import { ProfilePreview, IProps } from '../ProfilePreview';

const props: IProps = {
  onEditClick: jest.fn(),
  profile: {
    name: 'name',
    nickname: 'nickname',
    age: 1,
    bio: 'biography',
    avatarURL: '',
  },
};

describe('ProfilePreview component', () => {
  const component = mount(<ProfilePreview {...props}/>);

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onEditClick callback on Edit click', () => {
    component.find('.profile-preview__edit').simulate('click');
    expect(props.onEditClick).toHaveBeenCalledTimes(1);
  });
});
