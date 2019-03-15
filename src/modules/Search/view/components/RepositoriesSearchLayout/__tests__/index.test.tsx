import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { makeMockEntry, makeMockContainer } from 'shared/mocks';

import { RepositoriesSearchLayout, IRepositoriesSearchLayoutProps } from '../RepositoriesSearchLayout';

const props: IRepositoriesSearchLayoutProps = {
  repositoriesSearchFeatureEntry: makeMockEntry({
    RepositoriesSearchForm: makeMockContainer('RepositoriesSearchForm'),
    RepositoriesSearchResults: makeMockContainer('RepositoriesSearchResults'),
  }),
};

describe('(modules/Search) RepositoriesSearchLayout component', () => {
  let component: ShallowWrapper<IRepositoriesSearchLayoutProps>;
  beforeEach(() => component = shallow(<RepositoriesSearchLayout {...props} />));

  it('should show search results after submit search form', () => {
    const { RepositoriesSearchResults, RepositoriesSearchForm } = props.repositoriesSearchFeatureEntry.containers;
    expect(component.find(RepositoriesSearchResults).length).toBe(0);

    component.find(RepositoriesSearchForm).prop('onSubmit')({} as any);
    expect(component.find(RepositoriesSearchResults).length).toBe(1);
  });
});
