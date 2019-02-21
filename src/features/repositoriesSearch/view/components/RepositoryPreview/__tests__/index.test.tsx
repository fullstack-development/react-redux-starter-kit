import React from 'react';
import { mount } from 'enzyme';

import { getRepositoryMock } from 'shared/helpers';

import RepositoryPreview, { IRepositoryPreviewProps } from '../RepositoryPreview';

const props: IRepositoryPreviewProps = {
  repository: getRepositoryMock(),
  onOwnerClick: jest.fn(),
};

describe('RepositoryPreview component', () => {
  const component = mount(<RepositoryPreview {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onOwnerClick callback on owner click', () => {
    component.find('.repository-preview__value_owner').simulate('click');
    expect(props.onOwnerClick).toHaveBeenCalledTimes(1);
  });
});
