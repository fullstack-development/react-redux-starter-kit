import React from 'react';
import block from 'bem-cn';
import './SearchFilters.scss';

const b = block('search-filters');

interface IProps {
  filters: Record<string, string | number>;
}

function SearchFilters(props: IProps) {
  const { filters } = props;
  return (
    <ul className={b()}>
      {Object.keys(filters).map(filter => (
        <li className={b('filter')} key={filter}>
          <span className={b('filter-name')}>
            {filter.concat(': ')}
          </span>
          <span className={b('filter-value')}>
            {filters[filter]}
          </span>
        </li>
      ))}
    </ul>
  );
}

export { IProps as ISearchFiltersProps };
export default SearchFilters;
