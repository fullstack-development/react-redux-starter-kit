import React from 'react';
import { mount, shallow } from 'enzyme';
import { INotification } from 'shared/types/common';
import { Notification } from '../Notification';

describe('Notification component', () => {
  const notification: INotification = {
    kind: 'error',
    text: 'notification text',
  };
  const component = mount(<Notification notification={notification} />);

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render notification text', () => {
    expect(component.find('.notification__text').text()).toBe(notification.text);
  });

  it('should not render if no notification provided', () => {
    const emptyNotification = shallow(<Notification notification={null} />);
    expect(emptyNotification.html()).toBeNull();
  });
});
