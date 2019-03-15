import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { makeMockEntry, makeMockContainer } from 'shared/mocks';

import { UsersSearchLayout, IUsersSearchLayoutProps } from '../UsersSearchLayout';

const props: IUsersSearchLayoutProps = {
  usersSearchFeatureEntry: makeMockEntry({
    UsersSearchForm: makeMockContainer('UsersSearchForm'),
    UsersSearchResults: makeMockContainer('UsersSearchResults'),
  }),
};

describe('(modules/Search) UsersSearchLayout component', () => {
  let component: ShallowWrapper<IUsersSearchLayoutProps>;
  beforeEach(() => component = shallow(<UsersSearchLayout {...props} />));

  it('should show search results after submit search form', () => {
    const { UsersSearchResults, UsersSearchForm } = props.usersSearchFeatureEntry.containers;
    expect(component.find(UsersSearchResults).length).toBe(0);

    component.find(UsersSearchForm).prop('onSubmit')({} as any);
    expect(component.find(UsersSearchResults).length).toBe(1);
  });
});
