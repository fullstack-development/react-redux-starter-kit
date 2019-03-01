import React from 'react';
import { shallow } from 'enzyme';

import { repository } from 'shared/mocks';

import RepositoryPreview, { IRepositoryPreviewProps } from '../RepositoryPreview';

const props: IRepositoryPreviewProps = {
  repository,
  onOwnerClick: jest.fn(),
};

describe('RepositoryPreview component', () => {
  const component = shallow(<RepositoryPreview {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
