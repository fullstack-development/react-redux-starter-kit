import { makeShallowRenderer } from 'shared/helpers';

import RepositoryAttribute, { IRepositoryAttributeProps } from '../RepositoryAttribute';

const props: IRepositoryAttributeProps = {
  title: 'title',
  value: 'value',
  onValueClick: jest.fn(),
};

const getComponent = makeShallowRenderer(RepositoryAttribute, props);

describe('(features/repositoriesSearch) RepositoryAttribute component', () => {
  it('should call onValueClick on value click', () => {
    const onValueClick = jest.fn();
    const component = getComponent({ onValueClick });
    component.find('.repository-attribute__value').simulate('click');
    expect(onValueClick).toHaveBeenCalledTimes(1);
  });
});
