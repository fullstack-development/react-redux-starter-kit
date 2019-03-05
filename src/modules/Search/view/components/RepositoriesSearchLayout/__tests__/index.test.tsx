import React from 'react';
import { render } from 'enzyme';

import { makeMockEntry } from 'shared/mocks';

import { RepositoriesSearchLayout, IRepositoriesSearchLayoutProps } from '../RepositoriesSearchLayout';

const props: IRepositoriesSearchLayoutProps = {
  repositoriesSearchFeatureEntry: makeMockEntry(),
};

describe('RepositoriesSearchLayout component', () => {
  it('should match snapshot', () => {
    const component = render(<RepositoriesSearchLayout {...props} />);
    expect(component).toMatchSnapshot();
  });
});
