import React from 'react';
import { shallow } from 'enzyme';

import { makeMockEntry, makeMockContainer } from 'shared/mocks';

import { RepositoriesSearchLayout, IRepositoriesSearchLayoutProps } from '../RepositoriesSearchLayout';

const props: IRepositoriesSearchLayoutProps = {
  repositoriesSearchFeatureEntry: makeMockEntry({
    RepositoriesSearchForm: makeMockContainer('RepositoriesSearchForm'),
    RepositoriesSearchResults: makeMockContainer('RepositoriesSearchResults'),
  }),
};

describe('(modules/Search) RepositoriesSearchLayout component', () => {
  const component = shallow(<RepositoriesSearchLayout {...props} />);
  it('should show search results after submit search form', () => {
    expect(component.find('RepositoriesSearchResults').length).toBe(0);
    const formFields = {};
    component.find('RepositoriesSearchForm').prop<(formFields: object) => void>('onSubmit')(formFields);
    expect(component.find('RepositoriesSearchResults').length).toBe(1);
  });
});
