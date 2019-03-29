import { makeShallowRenderer } from 'shared/helpers';
import { maxRenderedPages } from '../constants';
import PaginationArrow from '../PaginationArrow/PaginationArrow';
import PaginationPage from '../PaginationPage/PaginationPage';
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
    const page = 3;
    component.find(PaginationPage).at(page - 1).prop('onClick')(page);
    expect(onPageRequest).toHaveBeenCalledWith(page);
  });

  it('should call onPageRequest with prev page number on left arrow click', () => {
    const onPageRequest = jest.fn();
    const component = getComponent({ onPageRequest });
    const leftArrow = component.find(PaginationArrow).at(0);
    leftArrow.prop('onClick')();
    expect(onPageRequest).toHaveBeenCalledWith(props.currentPage - 1);
  });

  it('should call onPageRequest with next page number on right arrow click', () => {
    const onPageRequest = jest.fn();
    const component = getComponent({ onPageRequest });
    const rightArrow = component.find(PaginationArrow).at(1);
    rightArrow.prop('onClick')();
    expect(onPageRequest).toHaveBeenCalledWith(props.currentPage + 1);
  });

  it('should render both arrows if not first or last page', () => {
    const component = getComponent();
    const leftArrow = component.find(PaginationArrow).at(0);
    const rightArrow = component.find(PaginationArrow).at(1);
    expect(leftArrow.prop('disabled')).toBe(false);
    expect(rightArrow.prop('disabled')).toBe(false);
  });

  it('should not render left arrow if first page', () => {
    const component = getComponent({ currentPage: 1 });
    const leftArrow = component.find(PaginationArrow).at(0);
    expect(leftArrow.prop('disabled')).toBe(true);
  });

  it('should not render right arrow if last page', () => {
    const component = getComponent({ currentPage: props.totalPages });
    const rightArrow = component.find(PaginationArrow).at(1);
    expect(rightArrow.prop('disabled')).toBe(true);
  });

  it('should not render more than max pages', () => {
    const component = getComponent({ totalPages: maxRenderedPages + 10 });
    expect(component.find(PaginationPage).length).toBe(maxRenderedPages);
  });

  it('should not be rendered if totalPages <= 1', () => {
    const component = getComponent({ totalPages: 1 });
    expect(component.html()).toBeNull();
  });
});
