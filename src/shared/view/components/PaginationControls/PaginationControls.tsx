import * as React from 'react';
import block from 'bem-cn';
import * as R from 'ramda';
import { bind } from 'decko';

import './PaginationControls.scss';

interface IProps {
  totalPages: number;
  currentPage: number;
  onPageRequest(pageNumber: number): void;
}

const b = block('pagination-controls');

class PaginationControls extends React.PureComponent<IProps, {}> {
  public render() {
    const { currentPage, totalPages } = this.props;
    return (
      <div className={b()}>
        {currentPage > 1 && this.renderArrow('left')}
        {R.range(1, totalPages).map(this.renderPage)}
        {currentPage < totalPages && this.renderArrow('right')}
      </div>
    );
  }

  private renderArrow(direction: 'left' | 'right') {
    return <div className={b('arrow', { direction })}/>;
  }

  @bind
  private renderPage(_: number, i: number) {
    const { currentPage } = this.props;
    const pageNumber  = i + 1;
    return (
      <div className={b('page', { active: currentPage === pageNumber })}>
        {pageNumber}
      </div>
    );
  }
}

export default PaginationControls;
