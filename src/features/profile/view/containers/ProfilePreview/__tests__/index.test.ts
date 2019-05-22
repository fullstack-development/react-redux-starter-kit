import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { Popover } from 'shared/view/components';
import { profile } from 'shared/mocks';

import { ProfilePreview, IProfilePreviewProps } from '../ProfilePreview';

const props: IProfilePreviewProps = {
  onEditClick: jest.fn(),
  profile,
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(ProfilePreview, props);

describe('(features/profile) ProfilePreview container', () => {

  it('should not show popover with profile info initially', () => {
    const component = getComponent();
    expect(component.find(Popover).prop('open')).toBe(false);
  });

  it('should show popover with profile info on avatar click & hide on onClose call', () => {
    const component = getComponent();
    component.find('.profile-preview__avatar').simulate('click');
    const popover = component.find(Popover);
    expect(popover.prop('open')).toBe(true);

    popover.prop('onClose')();
    component.update();
    expect(component.find(Popover).prop('open')).toBe(false);
  });

  it('should call onEditClick on Edit click', () => {
    const onEditClick = jest.fn();
    const component = getComponent({ onEditClick });
    component.find('.profile-preview__edit').simulate('click');
    expect(onEditClick).toHaveBeenCalledTimes(1);
  });
});
