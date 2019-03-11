import React from 'react';
import { shallow } from 'enzyme';

import { makeMockEntry, makeMockContainer } from 'shared/mocks';

import { UsersSearchLayout, IUsersSearchLayoutProps } from '../UsersSearchLayout';

const props: IUsersSearchLayoutProps = {
  usersSearchFeatureEntry: makeMockEntry({
    UsersSearchForm: makeMockContainer('UsersSearchForm'),
    UsersSearchResults: makeMockContainer('UsersSearchResults'),
  }),
};

describe('UsersSearchLayout component', () => {
  const component = shallow(<UsersSearchLayout {...props} />);
  it('should show search results after submit search form', () => {
    expect(component.find('UsersSearchResults').length).toBe(0);
    const formFields = {};
    component.find('UsersSearchForm').prop<(formFields: object) => void>('onSubmit')(formFields);
    expect(component.find('UsersSearchResults').length).toBe(1);
  });
});
