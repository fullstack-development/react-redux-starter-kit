import { makeShallowRenderer } from 'shared/helpers';
import PaginationControls, { IPaginationControlsProps } from '../PaginationControls';

const props: IPaginationControlsProps = {
  totalPages: 5,
  currentPage: 2,
  onPageRequest: jest.fn(),
};

const getComponent = makeShallowRenderer(PaginationControls, props);

describe('(shared/view) PaginationControls component', () => {
  it('should call onPageRequest with page number on page number click', () => {
    const onPageRequest = jest.fn();
    const component = getComponent({ onPageRequest });
    component.find('.pagination-controls__page').at(2).simulate('click');
    expect(onPageRequest).toHaveBeenCalledWith(3);
  });

  it('should call onPageRequest with prev page number on left arrow click', () => {
    const onPageRequest = jest.fn();
    const component = getComponent({ onPageRequest });
    const leftArrow = component.find('.pagination-controls__arrow_direction_left');
    leftArrow.simulate('click');
    expect(onPageRequest).toHaveBeenCalledWith(props.currentPage - 1);
  });

  it('should call onPageRequest with next page number on right arrow click', () => {
    const onPageRequest = jest.fn();
    const component = getComponent({ onPageRequest });
    const rightArrow = component.find('.pagination-controls__arrow_direction_right');
    rightArrow.simulate('click');
    expect(onPageRequest).toHaveBeenCalledWith(props.currentPage + 1);
  });

  it('should render both arrows if not first or last page', () => {
    const component = getComponent();
    const leftArrow = component.find('.pagination-controls__arrow_direction_left');
    const rightArrow = component.find('.pagination-controls__arrow_direction_right');
    expect(leftArrow.hasClass('pagination-controls__arrow_hidden')).toBe(false);
    expect(rightArrow.hasClass('pagination-controls__arrow_hidden')).toBe(false);
  });

  it('should not render left arrow if first page', () => {
    const component = getComponent({ currentPage: 1 });
    const leftArrow = component.find('.pagination-controls__arrow_direction_left');
    expect(leftArrow.hasClass('pagination-controls__arrow_hidden')).toBe(true);
  });

  it('should not render right arrow if last page', () => {
    const component = getComponent({ currentPage: 5 });
    const rightArrow = component.find('.pagination-controls__arrow_direction_right');
    expect(rightArrow.hasClass('pagination-controls__arrow_hidden')).toBe(true);
  });

  it('should not be rendered if totalPages <= 1', () => {
    const component = getComponent({ totalPages: 1 });
    expect(component.html()).toBeNull();
  });
});
