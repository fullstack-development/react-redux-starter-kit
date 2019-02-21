import React from 'react';
import { shallow } from 'enzyme';

import { getDetailedGithubUserMock } from 'shared/helpers';

import { UserDetails, IUserDetailsProps } from '../UserDetails';

const props: IUserDetailsProps = {
  userDetails: getDetailedGithubUserMock(),
  isLoadUserDetailsRequesting: false,
  loadUserDetails: jest.fn(),
  onClose: jest.fn(),
  username: 'the user',
};

describe('UserDetails component', () => {
  const component = shallow(<UserDetails {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
