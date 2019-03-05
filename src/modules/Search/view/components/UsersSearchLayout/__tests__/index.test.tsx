import React from 'react';
import { render } from 'enzyme';

import { makeMockEntry } from 'shared/mocks';

import { UsersSearchLayout, IUsersSearchLayoutProps } from '../UsersSearchLayout';

const props: IUsersSearchLayoutProps = {
  usersSearchFeatureEntry: makeMockEntry(),
};

describe('UsersSearchLayout component', () => {
  it('should match snapshot', () => {
    const component = render(<UsersSearchLayout {...props} />);
    expect(component).toMatchSnapshot();
  });
});
