import React, { PureComponent } from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';
import PaginationControl from "../PaginationControl/PaginationControl";

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
      <PaginationControl
        className={b({ active }).toString()}
        onClick={this.makePageClickHandler(page)}
        focusRipple
        disableTouchRipple
      >
        {page}
      </PaginationControl>
    );
  }

  @autobind
  private makePageClickHandler(page: number) {
    const { onClick } = this.props;
    return () => onClick(page);
  }
}

export { PaginationPage, IProps as IPaginationPageProps };
