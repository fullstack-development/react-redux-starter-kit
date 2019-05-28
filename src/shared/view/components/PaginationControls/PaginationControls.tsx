import React from 'react';
import block from 'bem-cn';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import PaginationPage from './PaginationPage/PaginationPage';
import PaginationArrow from './PaginationArrow/PaginationArrow';
import { maxRenderedPages } from './constants';
import './PaginationControls.scss';

type ArrowDirection = 'left' | 'right';

interface IProps {
  totalPages: number;
  currentPage: number;
  onPageRequest(pageNumber: number): void;
}

const pagesFromMiddlePage = Math.floor(maxRenderedPages / 2);

const b = block('pagination-controls');

class PaginationControls extends React.PureComponent<IProps> {
  public render() {
    const { currentPage, totalPages } = this.props;
    const pagesOnTheLeft = (totalPages - currentPage) < pagesFromMiddlePage
      ? maxRenderedPages - (totalPages - currentPage) - 1
      : pagesFromMiddlePage;
    const firstRenderedPage = Math.max(1, currentPage - pagesOnTheLeft);
    const lastRenderedPage = Math.min(totalPages + 1, (firstRenderedPage + maxRenderedPages));

    return totalPages > 1 && (
      <div className={b()}>
        {this.renderArrow('left', currentPage <= 1)}
        {R.range(firstRenderedPage, lastRenderedPage).map(this.renderPage)}
        {this.renderArrow('right', currentPage >= totalPages)}
      </div>
    );
  }

  private renderArrow(direction: ArrowDirection, disabled: boolean) {
    return (
      <div className={b('arrow')}>
        <PaginationArrow
          direction={direction}
          onClick={this.makeArrowClickHandler(direction)}
          disabled={disabled}
        />
      </div>
    );
  }

  @autobind
  private renderPage(page: number) {
    const { currentPage, onPageRequest } = this.props;
    return (
      <div className={b('page')} key={page}>
        <PaginationPage
          active={currentPage === page}
          onClick={onPageRequest}
          page={page}
        />
      </div>
    );
  }

  @autobind
  private makeArrowClickHandler(direction: ArrowDirection) {
    return () => {
      const { onPageRequest, currentPage } = this.props;
      const requestingPage = direction === 'left' ? currentPage - 1 : currentPage + 1;
      onPageRequest(requestingPage);
    };
  }
}

export { IProps as IPaginationControlsProps };
export default PaginationControls;
