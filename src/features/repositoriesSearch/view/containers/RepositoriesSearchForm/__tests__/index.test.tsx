import React from 'react';
import { render } from 'enzyme';

import { RepositoriesSearchForm, IRepositoriesSearchFormProps } from '../RepositoriesSearchForm';

const props: IRepositoriesSearchFormProps = {
  onSubmit: jest.fn(),
  searchRepositories: jest.fn(),
  resetSearchResults: jest.fn(),
  isRepositoriesSearchRequesting: false,
};

describe('RepositoriesSearchForm component', () => {
  const component = render(<RepositoriesSearchForm {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
