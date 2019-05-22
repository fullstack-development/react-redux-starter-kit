import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { SearchForm } from 'shared/view/components';

import { RepositoriesSearchForm, IRepositoriesSearchFormProps } from '../RepositoriesSearchForm';

const props: IRepositoriesSearchFormProps = {
  onSubmit: jest.fn(),
  searchRepositories: jest.fn(),
  resetSearchResults: jest.fn(),
  isRepositoriesSearchRequesting: false,
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(RepositoriesSearchForm, props);

describe('(features/repositoriesSearch) RepositoriesSearchForm container', () => {
  it('should call onSubmit and searchRepositories with form values on form submit', () => {
    const searchRepositories = jest.fn();
    const onSubmit = jest.fn();
    const component = getComponent({ searchRepositories, onSubmit });
    const formValues = {};
    component.find(SearchForm).prop('onSubmit')(formValues);
    expect(searchRepositories).toHaveBeenCalledWith({ searchOptions: formValues, page: 1 });
    expect(onSubmit).toHaveBeenCalledWith(formValues);
  });

  it('should call resetSearchResults on reset search results', () => {
    const resetSearchResults = jest.fn();
    const component = getComponent({ resetSearchResults });
    component.find(SearchForm).prop('resetSearchResults')();
    expect(resetSearchResults).toHaveBeenCalledTimes(1);
  });
});
