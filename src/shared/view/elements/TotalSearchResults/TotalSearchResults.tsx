import React from 'react';
import block from 'bem-cn';
import './TotalSearchResults.scss';

interface IProps {
  title: string;
}

const b = block('total-search-results');

function TotalSearchResults(props: IProps) {
  const { title } = props;
  return (
    <div className={b()}>
      <span className={b('title')}>
        {title}
      </span>
    </div>
  );
}

export { TotalSearchResults, IProps as ITotalSearchResultsProps };
