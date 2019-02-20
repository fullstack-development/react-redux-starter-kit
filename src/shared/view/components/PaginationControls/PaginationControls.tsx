import React from 'react';
import block from 'bem-cn';
import * as R from 'ramda';
import './PaginationControls.scss';

type ArrowDirection = 'left' | 'right';

interface IProps {
  totalPages: number;
  currentPage: number;
  onPageRequest(pageNumber: number): void;
}

const maxRenderedPages = 11;
const pagesFromMiddlePage = Math.floor(maxRenderedPages / 2);

const b = block('pagination-controls');

function PaginationControls(props: IProps) {
  const { currentPage, totalPages } = props;
  const pagesOnTheLeft = (totalPages - currentPage) < pagesFromMiddlePage
    ? maxRenderedPages - (totalPages - currentPage) - 1
    : pagesFromMiddlePage;
  const firstRenderedPage = Math.max(1, currentPage - pagesOnTheLeft);
  const lastRenderedPage = Math.min(totalPages + 1, (firstRenderedPage + maxRenderedPages));

  return totalPages > 1
    ? (
      <div className={b()}>
        {renderArrow('left', currentPage <= 1)}
        {R.range(firstRenderedPage, lastRenderedPage).map(renderPage)}
        {renderArrow('right', currentPage >= totalPages)}
      </div>
    )
    : null;

  function renderArrow(direction: ArrowDirection, hidden: boolean) {
    return <div className={b('arrow', { direction, hidden })} onClick={makeArrowClickHandler(direction)}/>;
  }

  function renderPage(page: number) {
    return (
      <div
        className={b('page', { active: currentPage === page })}
        key={page}
        onClick={makePageClickHandler(page)}
      >
        {page}
      </div>
    );
  }

  function makePageClickHandler(page: number) {
    return () => props.onPageRequest(page);
  }

  function makeArrowClickHandler(direction: ArrowDirection) {
    return () => {
      const { onPageRequest } = props;
      const requestingPage = direction === 'left' ? currentPage - 1 : currentPage + 1;
      onPageRequest(requestingPage);
    };
  }
}

export default PaginationControls;
