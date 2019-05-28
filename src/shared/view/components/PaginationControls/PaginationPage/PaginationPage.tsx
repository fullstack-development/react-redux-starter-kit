import ButtonBase from '@material-ui/core/ButtonBase';
import React, { PureComponent } from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import './PaginationPage.scss';

interface IProps {
  page: number;
  active: boolean;
  onClick(page: number): void;
}

const b = block('pagination-page');

class PaginationPage extends PureComponent<IProps> {
  public render() {
    const { page, active } = this.props;
    return (
      <ButtonBase
        className={b({ active }).toString()}
        onClick={this.makePageClickHandler(page)}
        focusRipple
        disableTouchRipple
      >
        {page}
      </ButtonBase>
    );
  }

  @autobind
  private makePageClickHandler(page: number) {
    return () => this.props.onClick(page);
  }
}

export { IProps as IPaginationPageProps };
export default PaginationPage;
