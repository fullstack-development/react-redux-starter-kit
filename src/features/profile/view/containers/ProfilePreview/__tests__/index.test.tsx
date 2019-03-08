import React from 'react';
import { mount } from 'enzyme';

import { profile } from 'shared/mocks';

import { ProfilePreview, IProfilePreviewProps } from '../ProfilePreview';

const props: IProfilePreviewProps = {
  onEditClick: jest.fn(),
  profile,
};

describe('ProfilePreview component', () => {
  const component = mount(<ProfilePreview {...props}/>);

  it('should not show profile info initially', () => {
    const info = component.find('.profile-preview__info');
    expect(info.length).toBe(0);
  });

  it('should show profile info on avatar click', () => {
    component.find('.profile-preview__avatar').simulate('click');
    const info = component.find('.profile-preview__info');
    expect(info.length).toBeGreaterThan(0);
  });

  it('should call onEditClick on Edit click', () => {
    component.find('.profile-preview__edit').simulate('click');
    expect(props.onEditClick).toHaveBeenCalledTimes(1);
  });
});
