import ButtonBase from '@material-ui/core/ButtonBase';
import { makeShallowRenderer } from 'shared/helpers';
import PaginationPage , { IPaginationPageProps } from '../PaginationPage';

const props: IPaginationPageProps = {
  page: 1,
  active: false,
  onClick: jest.fn(),
};

const getComponent = makeShallowRenderer(PaginationPage, props);

describe('(shared/view) PaginationControls/PaginationPage component)', () => {
  it('should render page number', () => {
    const component = getComponent();
    expect(component.find(ButtonBase).children().text()).toBe(String(props.page));
  });

  it('should call onClick prop with page number on button click', () => {
    const onClick = jest.fn();
    const component = getComponent({ onClick });
    expect(onClick).not.toHaveBeenCalled();
    component.find(ButtonBase).prop('onClick')();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(props.page);
  });

  it('should add active modifier if active prop = true', () => {
    const component = getComponent();
    const activeComponent = getComponent({ active: true });
    const activeClass = 'pagination-page_active';
    expect(component.find(ButtonBase).hasClass(activeClass)).toBe(false);
    expect(activeComponent.find(ButtonBase).hasClass(activeClass)).toBe(true);
  });
});
