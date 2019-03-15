import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { makeMockContainer, repository } from 'shared/mocks';
import { PaginationControls } from 'shared/view/components';

import { RepositoryPreview } from '../../../components';
import {
  RepositoriesSearchResults, IRepositoriesSearchResultsProps, IRepositoriesSearchResultsState,
} from '../RepositoriesSearchResults';

const props: IRepositoriesSearchResultsProps = {
  searchOptions: {
    searchString: 'search',
  },
  repositories: Array(10).fill(repository),
  paginationState: {
    page: 1,
    totalPages: 1,
  },
  searchRepositories: jest.fn(),
  UserDetails: makeMockContainer('UserDetails'),
};

describe('(features/repositoriesSearch) RepositoriesSearchResults container', () => {
  let component: ShallowWrapper<IRepositoriesSearchResultsProps, IRepositoriesSearchResultsState>;
  beforeEach(() => component = shallow(<RepositoriesSearchResults {...props} />));

  it('should render all found repositories', () => {
    const renderedRepos = component.find('.repositories-search-results__repository-preview');
    expect(renderedRepos.length).toBe(props.repositories.length);
  });

  it('should call searchRepositories with search options and page number on PaginationControls page request', () => {
    const page = 1;
    const { searchOptions, searchRepositories } = props;
    component.find(PaginationControls).prop('onPageRequest')(page);
    expect(searchRepositories).toHaveBeenCalledWith({ searchOptions, page });
  });

  it('should render user details after RepositoryPreview owner click', () => {
    const { UserDetails } = props;
    expect(component.find(UserDetails).length).toBe(0);

    const { username } = props.repositories[0].owner;
    const repositoryPreview = component.find(RepositoryPreview).at(0);
    repositoryPreview.prop('onOwnerClick')(username);
    expect(component.find(UserDetails).length).toBe(1);
  });

  it('should hide user details after UserDetails onClose call', () => {
    const { UserDetails } = props;
    component.setState({ displayedRepositoryOwner: 'owner' });
    expect(component.find(UserDetails).length).toBe(1);

    const userDetails = component.find(UserDetails);
    userDetails.prop('onClose')();
    expect(component.find(UserDetails).length).toBe(0);
  });
});
