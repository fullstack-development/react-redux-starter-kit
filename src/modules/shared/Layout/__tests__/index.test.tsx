import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

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

describe('(modules/shared) Layout component', () => {
  let component: ShallowWrapper<ILayoutProps>;
  beforeEach(() => component = shallow(<Layout {...props} />));

  it('should redirect to profile page on edit profile click', () => {
    const { ProfilePreview } = props.profileFeatureEntry.containers;
    component.find(ProfilePreview).prop('onEditClick')();
    expect(props.history.push).toHaveBeenCalledWith(routes.profile.getRoutePath());
  });
});
