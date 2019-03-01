import React from 'react';
import { shallow } from 'enzyme';

import UsersSearchSettings from '../UsersSearchSettings';

describe('UsersSearchSettings component', () => {
  const component = shallow(<UsersSearchSettings />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
