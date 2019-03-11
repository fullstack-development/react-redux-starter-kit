import React from 'react';
import { shallow } from 'enzyme';

import { RepositoriesSearchForm, IRepositoriesSearchFormProps } from '../RepositoriesSearchForm';

const props: IRepositoriesSearchFormProps = {
  onSubmit: jest.fn(),
  searchRepositories: jest.fn(),
  resetSearchResults: jest.fn(),
  isRepositoriesSearchRequesting: false,
};

describe('(features/repositoriesSearch) RepositoriesSearchForm container', () => {
  const component = shallow(<RepositoriesSearchForm {...props} />);
  const searchForm = component.find('SearchForm');

  it('should call onSubmit and searchRepositories with form values on form submit', () => {
    const formValues = {};
    searchForm.prop<(formValues: object) => void>('onSubmit')(formValues);
    expect(props.searchRepositories).toHaveBeenCalledWith({ searchOptions: formValues, page: 1 });
    expect(props.onSubmit).toHaveBeenCalledWith(formValues);
  });

  it('should call resetRepositories on reset search results', () => {
    searchForm.prop<() => void>('resetSearchResults')();
    expect(props.resetSearchResults).toHaveBeenCalledTimes(1);
  });
});
