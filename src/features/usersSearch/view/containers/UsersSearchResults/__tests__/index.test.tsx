import React from 'react';
import { shallow } from 'enzyme';

import { getGithubUserMock } from 'shared/helpers';

import { UsersSearchResults, IUsersSearchResultsProps } from '../UsersSearchResults';

const props: IUsersSearchResultsProps = {
  searchOptions: {
    perPage: 30,
    searchBy: 'email',
    searchString: 'search',
    searchType: 'user',
  },
  users: Array(10).fill(getGithubUserMock()),
  paginationState: {
    page: 1,
    totalPages: 2,
  },
  searchUser: jest.fn(),
};

describe('UsersSearchResults component', () => {
  it('should match snapshot', () => {
    const component = shallow(<UsersSearchResults {...props} />);
    expect(component).toMatchSnapshot();
  });
});
