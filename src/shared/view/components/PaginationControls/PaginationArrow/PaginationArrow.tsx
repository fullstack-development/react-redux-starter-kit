import Chevron from '@material-ui/icons/ChevronLeft';
import React, { PureComponent } from 'react';
import block from 'bem-cn';
import PaginationControl from "../PaginationControl/PaginationControl";
import './PaginationArrow.scss';

type ArrowDirection = 'left' | 'right';

interface IProps {
  direction: ArrowDirection;
  disabled?: boolean;
  onClick(): void;
}

const b = block('pagination-arrow');

class PaginationArrow extends PureComponent<IProps> {
  public render() {
    const { direction, disabled, onClick } = this.props;
    return (
      <PaginationControl
        className={b({ direction }).toString()}
        onClick={onClick}
        disabled={disabled}
        focusRipple
        disableTouchRipple
      >
        <Chevron/>
      </PaginationControl>
    );
  }
}

export { PaginationArrow, IProps as IPaginationArrowProps };
