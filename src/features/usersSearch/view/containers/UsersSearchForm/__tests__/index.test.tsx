import React from 'react';
import { render } from 'enzyme';

import { UsersSearchForm, IUsersSearchFormProps } from '../UsersSearchForm';

const props: IUsersSearchFormProps = {
  onSubmit: jest.fn(),
  searchUser: jest.fn(),
  resetSearchResults: jest.fn(),
  isUsersSearchRequesting: false,
};

describe('UsersSearchForm component', () => {
  const component = render(<UsersSearchForm {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
