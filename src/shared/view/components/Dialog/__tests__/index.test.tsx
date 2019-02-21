import React from 'react';
import { shallow } from 'enzyme';

import Dialog, { IDialogProps } from '../Dialog';

const props: IDialogProps = {
  title: 'title',
  onClose: jest.fn(),
  open: true,
};

describe('Dialog component', () => {
  const component = shallow(<Dialog {...props}><div/></Dialog>);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
