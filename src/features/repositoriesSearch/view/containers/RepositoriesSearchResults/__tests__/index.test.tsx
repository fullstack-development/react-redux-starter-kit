import React from 'react';
import { shallow } from 'enzyme';
import 'reflect-metadata';

import { Container, repository } from 'shared/mocks';

import { RepositoriesSearchResults, IRepositoriesSearchResultsProps } from '../RepositoriesSearchResults';

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
  UserDetails: Container,
};

describe('RepositoriesSearchResults component', () => {
  const component = shallow(<RepositoriesSearchResults {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
