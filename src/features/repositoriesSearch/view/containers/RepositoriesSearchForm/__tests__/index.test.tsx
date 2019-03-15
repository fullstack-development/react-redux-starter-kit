import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { SearchForm } from 'shared/view/components';

import { RepositoriesSearchForm, IRepositoriesSearchFormProps } from '../RepositoriesSearchForm';

const props: IRepositoriesSearchFormProps = {
  onSubmit: jest.fn(),
  searchRepositories: jest.fn(),
  resetSearchResults: jest.fn(),
  isRepositoriesSearchRequesting: false,
};

describe('(features/repositoriesSearch) RepositoriesSearchForm container', () => {
  let component: ShallowWrapper<IRepositoriesSearchFormProps>;
  beforeEach(() => component = shallow(<RepositoriesSearchForm {...props} />));

  it('should call onSubmit and searchRepositories with form values on form submit', () => {
    const formValues = {};
    const searchForm = component.find(SearchForm);
    searchForm.prop('onSubmit')(formValues);
    expect(props.searchRepositories).toHaveBeenCalledWith({ searchOptions: formValues, page: 1 });
    expect(props.onSubmit).toHaveBeenCalledWith(formValues);
  });

  it('should call resetSearchResults on reset search results', () => {
    const searchForm = component.find(SearchForm);
    searchForm.prop('resetSearchResults')();
    expect(props.resetSearchResults).toHaveBeenCalledTimes(1);
  });
});
