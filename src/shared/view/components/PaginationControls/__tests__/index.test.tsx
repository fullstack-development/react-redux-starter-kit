import React from 'react';
import { mount } from 'enzyme';

import PaginationControls, { IPaginationControlsProps } from '../PaginationControls';

const props: IPaginationControlsProps = {
  totalPages: 5,
  currentPage: 2,
  onPageRequest: jest.fn(),
};

describe('PaginationControls component', () => {
  const component = mount(<PaginationControls {...props} />);
  const leftArrow = component.find('.pagination-controls__arrow_direction_left');
  const rightArrow = component.find('.pagination-controls__arrow_direction_right');

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onPageRequest with page number on page number click', () => {
    component.find('.pagination-controls__page').at(2).simulate('click');
    expect(props.onPageRequest).toHaveBeenCalledWith(3);
  });

  it('should call onPageRequest with prev page number on left arrow click', () => {
    leftArrow.simulate('click');
    expect(props.onPageRequest).toHaveBeenCalledWith(component.prop('currentPage') - 1);
  });

  it('should call onPageRequest with next page number on right arrow click', () => {
    rightArrow.simulate('click');
    expect(props.onPageRequest).toHaveBeenCalledWith(component.prop('currentPage') + 1);
  });

  it('should not render left arrow if first page', () => {
    component.setProps({ currentPage: 1 });
    expect(leftArrow.hasClass('pagination-controls__arrow_hidden')).toBe(false);
  });

  it('should not render right arrow if last page', () => {
    component.setProps({ currentPage: 5 });
    expect(rightArrow.hasClass('pagination-controls__arrow_hidden')).toBe(false);
  });

  it('should not be rendered if totalPages <= 1', () => {
    component.setProps({ totalPages: 1 });
    expect(component.html()).toBeNull();
  });
});
