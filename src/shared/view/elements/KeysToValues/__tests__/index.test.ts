import { makeShallowRenderer } from 'shared/helpers';

import KeysToValues, { IKeysToValuesProps } from '../KeysToValues';

const props: IKeysToValuesProps = {
  items: {
    item1: 'item',
    item2: 4,
  },
};

const getComponent = makeShallowRenderer(KeysToValues, props);

describe('(shared/view/elements) KeysToValues component', () => {
  it('should render all items', () => {
    const component = getComponent();
    expect(component.find('.keys-to-values__item').length).toBe(Object.keys(props.items).length);
  });
});
