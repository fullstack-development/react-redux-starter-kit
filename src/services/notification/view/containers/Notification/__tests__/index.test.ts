import { makeShallowRenderer } from 'shared/helpers';
import { Notification, INotificationProps } from '../Notification';

const props: INotificationProps = {
  notification: {
    kind: 'error',
    text: 'notification text',
  },
};

const getComponent = makeShallowRenderer(Notification, props);

describe('(services/notification) Notification container', () => {
  it('should render notification text', () => {
    const component = getComponent();
    expect(component.find('.notification__text').text()).toBe(props.notification!.text);
  });

  it('should not render if no notification provided', () => {
    const component = getComponent({ notification: null });
    expect(component.html()).toBeNull();
  });
});
