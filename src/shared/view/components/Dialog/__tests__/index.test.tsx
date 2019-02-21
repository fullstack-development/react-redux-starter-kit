import React from 'react';
import { render } from 'enzyme';

import Dialog, { IDialogProps } from '../Dialog';

const props: IDialogProps = {
  title: 'title',
  onClose: jest.fn(),
  open: true,
};

describe('Dialog component', () => {
  const component = render(<Dialog {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
