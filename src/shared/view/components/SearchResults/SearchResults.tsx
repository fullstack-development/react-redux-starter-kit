import React from 'react';
import {autobind} from 'core-decorators';
import block from 'bem-cn';

import {PaginationControls} from "../PaginationControls/PaginationControls";
import {PerPageSelector} from './PerPageSelector/PerPageSelector';

import './SearchResults.scss';

interface IOwnProps {
  totalPages: number;
  currentPage: number;
  totalResults: number;
  title: string;
  isSearchRequesting: boolean;

  onPageRequest(pageNumber: number): void;
  onChangePerPage(perPage: number): void;
  results: React.ReactChild;
}

type IProps = IOwnProps

const b = block('search-results');

class SearchResults extends React.PureComponent<IProps> {
  public render() {
    const {totalPages, currentPage, onPageRequest, results, title, onChangePerPage, isSearchRequesting} = this.props

    return (
      <div className={b()}>
        <div className={b('header', {hide: isSearchRequesting})}>
          <span className={b('title')}>
            {title}
          </span>
          <div className={b('per-page-selector')}>
            <PerPageSelector onChange={onChangePerPage}/>
          </div>
        </div>
        <div className={b('results')}>
          {results}
        </div>
        <div className={b('footer', {hide: isSearchRequesting})}>
          {this.renderTotalCountPages()}
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            onPageRequest={onPageRequest}
          />
        </div>
      </div>
    );
  }

  @autobind
  private renderTotalCountPages() {
    const {totalResults} = this.props;
    return (
      <div className={b('total')}>
        {
          totalResults > 0 &&
          totalResults > 100
            ? `${(Math.floor(totalResults / 100) * 100)}+ результатов`
            : `${totalResults} результатов`
        }
      </div>
    )
  }
}

export {
  SearchResults,
  IProps as ISearchResultsProps,
};
