import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import RepositoryAttribute, { IRepositoryAttributeProps } from '../RepositoryAttribute';

const props: IRepositoryAttributeProps = {
  title: 'title',
  value: 'value',
  onValueClick: jest.fn(),
};

describe('(features/repositoriesSearch) RepositoryAttribute component', () => {
  let component: ShallowWrapper<IRepositoryAttributeProps>;
  beforeEach(() => component = shallow(<RepositoryAttribute {...props} />));

  it('should call onValueClick on value click', () => {
    component.find('.repository-attribute__value').simulate('click');
    expect(props.onValueClick).toHaveBeenCalledTimes(1);
  });
});
