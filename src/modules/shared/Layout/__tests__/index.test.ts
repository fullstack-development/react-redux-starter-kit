import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { makeMockEntry, makeMockComponent, withRouterProps } from 'shared/mocks';

import { Layout, ILayoutProps } from '../Layout';
import routes from '../../../routes';

const props: ILayoutProps = {
  title: 'Title',
  profileFeatureEntry: makeMockEntry({
    ProfilePreview: makeMockComponent('ProfilePreview'),
  }),
  ...withRouterProps,
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(Layout, props);

describe('(modules/shared) Layout component', () => {
  it('should redirect to profile page on edit profile click', () => {
    const history = { ...props.history, push: jest.fn() };
    const component = getComponent({ history });
    const { ProfilePreview } = props.profileFeatureEntry.containers;
    component.find(ProfilePreview).prop('onEditClick')();
    expect(history.push).toHaveBeenCalledWith(routes.profile.getRoutePath());
  });
});
