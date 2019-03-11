import React from 'react';
import { shallow } from 'enzyme';

import { makeMockEntry, makeMockContainer, withRouterProps } from 'shared/mocks';

import { Layout, ILayoutProps } from '../Layout';
import routes from '../../../routes';

const props: ILayoutProps = {
  title: 'Title',
  profileFeatureEntry: makeMockEntry({
    ProfilePreview: makeMockContainer('ProfilePreview'),
  }),
  ...withRouterProps,
};

describe('Layout component', () => {
  const component = shallow(<Layout {...props} />);
  it('should redirect to profile page on edit profile click', () => {
    component.find('ProfilePreview').prop<() => void>('onEditClick')();
    expect(props.history.push).toHaveBeenCalledWith(routes.profile.getRoutePath());
  });
});
