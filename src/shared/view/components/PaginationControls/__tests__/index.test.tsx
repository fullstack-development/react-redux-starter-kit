import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import PaginationControls, { IPaginationControlsProps } from '../PaginationControls';

const props: IPaginationControlsProps = {
  totalPages: 5,
  currentPage: 2,
  onPageRequest: jest.fn(),
};

describe('(shared/view) PaginationControls component', () => {
  let component: ShallowWrapper<IPaginationControlsProps>;
  beforeEach(() => component = shallow(<PaginationControls {...props} />));

  it('should call onPageRequest with page number on page number click', () => {
    component.find('.pagination-controls__page').at(2).simulate('click');
    expect(props.onPageRequest).toHaveBeenCalledWith(3);
  });

  it('should call onPageRequest with prev page number on left arrow click', () => {
    const leftArrow = component.find('.pagination-controls__arrow_direction_left');
    leftArrow.simulate('click');
    expect(props.onPageRequest).toHaveBeenCalledWith(props.currentPage - 1);
  });

  it('should call onPageRequest with next page number on right arrow click', () => {
    const rightArrow = component.find('.pagination-controls__arrow_direction_right');
    rightArrow.simulate('click');
    expect(props.onPageRequest).toHaveBeenCalledWith(props.currentPage + 1);
  });

  it('should not render left arrow if first page', () => {
    const leftArrow = component.find('.pagination-controls__arrow_direction_left');
    component.setProps({ currentPage: 1 });
    expect(leftArrow.hasClass('pagination-controls__arrow_hidden')).toBe(false);
  });

  it('should not render right arrow if last page', () => {
    const rightArrow = component.find('.pagination-controls__arrow_direction_right');
    component.setProps({ currentPage: 5 });
    expect(rightArrow.hasClass('pagination-controls__arrow_hidden')).toBe(false);
  });

  it('should not be rendered if totalPages <= 1', () => {
    component.setProps({ totalPages: 1 });
    expect(component.html()).toBeNull();
  });
});
