import React from 'react';
import { mount } from 'enzyme';

import { ProfilePreview, IProfilePreviewProps } from '../ProfilePreview';

const props: IProfilePreviewProps = {
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

  it('should call onEditClick on Edit click', () => {
    component.find('.profile-preview__edit').simulate('click');
    expect(props.onEditClick).toHaveBeenCalledTimes(1);
  });
});
