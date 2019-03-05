import React from 'react';
import { shallow } from 'enzyme';

import { makeMockEntry } from 'shared/mocks';

import { ProfileLayout, IProfileLayoutProps } from '../ProfileLayout';

const props: IProfileLayoutProps = {
  profileFeatureEntry: makeMockEntry(),
};

describe('ProfileLayout component', () => {
  it('should match snapshot', () => {
    const component = shallow(<ProfileLayout {...props} />);
    expect(component).toMatchSnapshot();
  });
});
