import { makeShallowRenderer } from 'shared/helpers';
import { Popover } from 'shared/view/components';
import { profile } from 'shared/mocks';

import { ProfilePreview, IProfilePreviewProps } from '../ProfilePreview';

const props: IProfilePreviewProps = {
  onEditClick: jest.fn(),
  profile,
};

const getComponent = makeShallowRenderer(ProfilePreview, props);

describe('(features/profile) ProfilePreview container', () => {

  it('should not show popover with profile info initially', () => {
    const component = getComponent();
    const popover = component.find(Popover);
    expect(popover.prop('open')).toBe(false);
  });

  it('should show popover with profile info on avatar click', () => {
    const component = getComponent();
    component.find('.profile-preview__avatar').simulate('click');
    const popover = component.find(Popover);
    expect(popover.prop('open')).toBe(true);
  });

  it('should call onEditClick on Edit click', () => {
    const component = getComponent();
    component.find('.profile-preview__edit').simulate('click');
    expect(props.onEditClick).toHaveBeenCalledTimes(1);
  });
});
