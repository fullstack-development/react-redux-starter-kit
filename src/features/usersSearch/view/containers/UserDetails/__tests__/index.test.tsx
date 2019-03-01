import React from 'react';
import { shallow } from 'enzyme';

import { detailedGithubUser } from 'shared/mocks';

import { UserDetails, IUserDetailsProps } from '../UserDetails';

const props: IUserDetailsProps = {
  userDetails: detailedGithubUser,
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
