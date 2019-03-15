import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Notification, INotificationProps } from '../Notification';

const props: INotificationProps = {
  notification: {
    kind: 'error',
    text: 'notification text',
  },
};

describe('(services/notification) Notification container', () => {
  let component: ShallowWrapper<INotificationProps>;
  beforeEach(() => component = shallow(<Notification {...props} />));

  it('should render notification text', () => {
    expect(component.find('.notification__text').text()).toBe(props.notification!.text);
  });

  it('should not render if no notification provided', () => {
    const emptyNotification = shallow(<Notification notification={null} />);
    expect(emptyNotification.html()).toBeNull();
  });
});
