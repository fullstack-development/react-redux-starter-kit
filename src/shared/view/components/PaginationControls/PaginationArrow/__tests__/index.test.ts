import ButtonBase from '@material-ui/core/ButtonBase';
import { makeShallowRenderer } from 'shared/helpers';
import PaginationArrow , { IPaginationArrowProps } from '../PaginationArrow';

const props: IPaginationArrowProps = {
  direction: 'left',
  onClick: jest.fn(),
};

const getComponent = makeShallowRenderer(PaginationArrow, props);

describe('(shared/view) PaginationControls/PaginationArrow component)', () => {
  it('should add direction modifier', () => {
    const component = getComponent();
    expect(component.find(ButtonBase).hasClass(`pagination-arrow_direction_${props.direction}`)).toBe(true);
  });

  it('should call onClick prop on button click', () => {
    const onClick = jest.fn();
    const component = getComponent({ onClick });
    expect(onClick).not.toHaveBeenCalled();
    component.find(ButtonBase).prop('onClick')();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled if disabled prop = true is passed', () => {
    const component = getComponent();
    const disabledComponent = getComponent({ disabled: true });
    expect(component.find(ButtonBase).prop('disabled')).toBe(void 0);
    expect(disabledComponent.find(ButtonBase).prop('disabled')).toBe(true);
  });
});
