import { makeShallowRenderer } from 'shared/helpers';
import { makeMockContainer, repository } from 'shared/mocks';
import { PaginationControls } from 'shared/view/components';

import { RepositoryPreview } from '../../../components';
import {
  RepositoriesSearchResults, IRepositoriesSearchResultsProps,
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

const getComponent = makeShallowRenderer(RepositoriesSearchResults, props);

describe('(features/repositoriesSearch) RepositoriesSearchResults container', () => {
  it('should render all found repositories', () => {
    const component = getComponent();
    const renderedRepos = component.find('.repositories-search-results__repository-preview');
    expect(renderedRepos.length).toBe(props.repositories.length);
  });

  it('should call searchRepositories with search options and page number on PaginationControls page request', () => {
    const searchRepositories = jest.fn();
    const component = getComponent({ searchRepositories });
    const page = 1;
    const { searchOptions } = props;
    component.find(PaginationControls).prop('onPageRequest')(page);
    expect(searchRepositories).toHaveBeenCalledWith({ searchOptions, page });
  });

  it('should render user details after RepositoryPreview owner click', () => {
    const component = getComponent();
    const { UserDetails } = props;
    expect(component.find(UserDetails).length).toBe(0);

    const { username } = props.repositories[0].owner;
    component.find(RepositoryPreview).at(0).prop('onOwnerClick')(username);
    expect(component.find(UserDetails).length).toBe(1);
  });

  it('should hide user details after UserDetails onClose call', () => {
    const component = getComponent();
    const { UserDetails } = props;
    component.setState({ displayedRepositoryOwner: 'owner' });
    expect(component.find(UserDetails).length).toBe(1);

    component.find(UserDetails).prop('onClose')();
    expect(component.find(UserDetails).length).toBe(0);
  });
});
