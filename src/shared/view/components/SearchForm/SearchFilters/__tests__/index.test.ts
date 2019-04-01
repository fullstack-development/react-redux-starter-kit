import { makeShallowRenderer } from 'shared/helpers';

import SearchFilters, { ISearchFiltersProps } from '../SearchFilters';

const props: ISearchFiltersProps = {
  filters: {
    filter1: 'filter',
    filter2: 4,
  },
};

const getComponent = makeShallowRenderer(SearchFilters, props);

describe('(modules/shared) Layout component', () => {
  it('should render all filters', () => {
    const component = getComponent();
    expect(component.find('.search-filters__filter').length).toBe(Object.keys(props.filters).length);
  });
});
