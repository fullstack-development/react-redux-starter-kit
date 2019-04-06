import React from 'react';
import block from 'bem-cn';
import './TotalSearchResults.scss';

interface IProps {
  title: string;
  totalResults: number;
}

const b = block('total-search-results');

function TotalSearchResults(props: IProps) {
  const { title, totalResults } = props;
  return totalResults > 0 ? (
    <div className={b()}>
      <span className={b('title')}>
        {title}
      </span>
      <span className={b('value')}>
        {totalResults}
      </span>
    </div>
  ) : null;
}

export { IProps as ITotalSearchResultsProps };
export default TotalSearchResults;
