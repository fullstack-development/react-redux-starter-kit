import React from 'react';
import { shallow } from 'enzyme';

import { githubUser } from 'shared/mocks';
import { PaginationControls } from 'shared/view/components';

import { UsersAvatarsWall } from '../../../components';
import UserDetails from '../../UserDetails/UserDetails';
import { UsersSearchResults, IUsersSearchResultsProps } from '../UsersSearchResults';

const props: IUsersSearchResultsProps = {
  searchOptions: {
    perPage: 30,
    searchBy: 'email',
    searchString: 'search',
    searchType: 'user',
  },
  users: Array(10).fill(githubUser),
  paginationState: {
    page: 1,
    totalPages: 2,
  },
  searchUsers: jest.fn(),
};

describe('(features/usersSearch) UsersSearchResults container', () => {
  const component = shallow(<UsersSearchResults {...props} />);

  it('should show UserDetails on user avatar click', () => {
    expect(component.find(UserDetails).length).toBe(0);

    component.find(UsersAvatarsWall).prop('onAvatarClick')(githubUser);
    expect(component.find(UserDetails).length).toBe(1);
  });

  it('should call searchUser with search options and page number on PaginationControls page request', () => {
    const page = 1;
    const { searchOptions, searchUsers } = props;
    component.find(PaginationControls).prop('onPageRequest')(page);
    expect(searchUsers).toHaveBeenCalledWith({ searchOptions, page });
  });
});
