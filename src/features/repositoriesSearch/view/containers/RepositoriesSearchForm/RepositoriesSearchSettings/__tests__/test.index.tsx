import React from 'react';
import { shallow } from 'enzyme';

import RepositoriesSearchSettings from '../RepositoriesSearchSettings';

describe('RepositoriesSearchSettings component', () => {
  const component = shallow(<RepositoriesSearchSettings />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
