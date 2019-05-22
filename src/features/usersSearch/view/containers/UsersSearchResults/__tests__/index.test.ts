import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
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
    searchFor: 'user',
  },
  users: Array(10).fill(githubUser),
  paginationState: {
    page: 1,
    totalPages: 2,
  },
  searchUsers: jest.fn(),
  totalResults: 1,
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(UsersSearchResults, props);

describe('(features/usersSearch) UsersSearchResults container', () => {
  it('should show UserDetails on user avatar click & hide on UserDetails close', () => {
    const component = getComponent();
    expect(component.find(UserDetails).length).toBe(0);

    component.find(UsersAvatarsWall).prop('onAvatarClick')(githubUser);
    const userDetails = component.find(UserDetails);
    expect(userDetails.length).toBe(1);

    userDetails.prop('onClose')();
    expect(component.find(UserDetails).length).toBe(0);
  });

  it('should call searchUser with search options and page number on PaginationControls page request', () => {
    const searchUsers = jest.fn();
    const component = getComponent({ searchUsers });
    const page = 1;
    const { searchOptions } = props;
    component.find(PaginationControls).prop('onPageRequest')(page);
    expect(searchUsers).toHaveBeenCalledWith({ searchOptions, page });
  });
});
