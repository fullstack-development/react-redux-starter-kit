import ButtonBase from '@material-ui/core/ButtonBase';
import React, { PureComponent } from 'react';
import block from 'bem-cn';

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
      <ButtonBase
        className={b({ direction }).toString()}
        onClick={onClick}
        disabled={disabled}
        focusRipple
        disableTouchRipple
      />
    );
  }
}

export { IProps as IPaginationArrowProps };
export default PaginationArrow;
