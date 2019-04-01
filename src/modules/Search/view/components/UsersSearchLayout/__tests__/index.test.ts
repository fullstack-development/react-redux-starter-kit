import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { makeMockEntry, makeMockComponent } from 'shared/mocks';

import { UsersSearchLayout, IUsersSearchLayoutProps } from '../UsersSearchLayout';

const props: IUsersSearchLayoutProps = {
  usersSearchFeatureEntry: makeMockEntry({
    UsersSearchForm: makeMockComponent('UsersSearchForm'),
    UsersSearchResults: makeMockComponent('UsersSearchResults'),
  }),
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(UsersSearchLayout, props);

describe('(modules/Search) UsersSearchLayout component', () => {
  it('should show search results after submit search form', () => {
    const component = getComponent();
    const { UsersSearchResults, UsersSearchForm } = props.usersSearchFeatureEntry.containers;
    expect(component.find(UsersSearchResults).length).toBe(0);

    component.find(UsersSearchForm).prop('onSubmit')({} as any);
    expect(component.find(UsersSearchResults).length).toBe(1);
  });
});
