import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { makeMockEntry, makeMockComponent } from 'shared/mocks';

import { RepositoriesSearchLayout, IRepositoriesSearchLayoutProps } from '../RepositoriesSearchLayout';

const props: IRepositoriesSearchLayoutProps = {
  repositoriesSearchFeatureEntry: makeMockEntry({
    RepositoriesSearchForm: makeMockComponent('RepositoriesSearchForm'),
    RepositoriesSearchResults: makeMockComponent('RepositoriesSearchResults'),
  }),
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(RepositoriesSearchLayout, props);

describe('(modules/Search) RepositoriesSearchLayout component', () => {
  it('should show search results after submit search form', () => {
    const component = getComponent();
    const { RepositoriesSearchResults, RepositoriesSearchForm } = props.repositoriesSearchFeatureEntry.containers;
    expect(component.find(RepositoriesSearchResults).length).toBe(0);

    component.find(RepositoriesSearchForm).prop('onSubmit')({} as any);
    expect(component.find(RepositoriesSearchResults).length).toBe(1);
  });
});
