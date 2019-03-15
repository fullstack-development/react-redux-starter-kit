import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Popover } from 'shared/view/components';
import { profile } from 'shared/mocks';

import { ProfilePreview, IProfilePreviewProps } from '../ProfilePreview';

const props: IProfilePreviewProps = {
  onEditClick: jest.fn(),
  profile,
};

describe('(features/profile) ProfilePreview container', () => {
  let component: ShallowWrapper<IProfilePreviewProps>;
  beforeEach(() => component = shallow(<ProfilePreview {...props}/>));

  it('should not show popover with profile info initially', () => {
    const popover = component.find(Popover);
    expect(popover.prop('open')).toBe(false);
  });

  it('should show popover with profile info on avatar click', () => {
    component.find('.profile-preview__avatar').simulate('click');
    const popover = component.find(Popover);
    expect(popover.prop('open')).toBe(true);
  });

  it('should call onEditClick on Edit click', () => {
    component.find('.profile-preview__edit').simulate('click');
    expect(props.onEditClick).toHaveBeenCalledTimes(1);
  });
});
