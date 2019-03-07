import React from 'react';
import { shallow } from 'enzyme';

import { profile } from 'shared/mocks';

import { ProfilePreview, IProfilePreviewProps } from '../ProfilePreview';

const props: IProfilePreviewProps = {
  onEditClick: jest.fn(),
  profile,
};

describe('ProfilePreview component', () => {
  const component = shallow(<ProfilePreview {...props}/>);

  it('should call onEditClick on Edit click', () => {
    component.find('.profile-preview__edit').simulate('click');
    expect(props.onEditClick).toHaveBeenCalledTimes(1);
  });
});
