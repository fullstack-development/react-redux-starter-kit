import React from 'react';
import { shallow } from 'enzyme';

import { githubUser } from 'shared/mocks';
import { IPaginationControlsProps } from 'shared/view/components';

import { IUsersAvatarsWallProps } from '../../../components/UsersAvatarsWall/UsersAvatarsWall';
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
    expect(component.find('Connect(UserDetails)').length).toBe(0);
    // TODO: add proper types to .prop calls
    component.find('UsersAvatarsWall').prop<IUsersAvatarsWallProps['onAvatarClick']>('onAvatarClick')(githubUser);
    expect(component.find('Connect(UserDetails)').length).toBe(1);
  });

  it('should call searchUser with search options and page number on PaginationControls page request', () => {
    const page = 1;
    const { searchOptions, searchUsers } = props;
    const paginationControls = component.find('PaginationControls');
    paginationControls.prop<IPaginationControlsProps['onPageRequest']>('onPageRequest')(page);
    expect(searchUsers).toHaveBeenCalledWith({ searchOptions, page });
  });
});
