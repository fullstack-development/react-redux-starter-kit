import { ShallowWrapper } from 'enzyme';

import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { repository } from 'shared/mocks';

import RepositoryAttribute, { IRepositoryAttributeProps } from '../../RepositoryAttribute/RepositoryAttribute';
import { RepositoryPreview, IRepositoryPreviewProps } from '../RepositoryPreview';

const props: IRepositoryPreviewProps = {
  repository,
  onOwnerClick: jest.fn(),
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(RepositoryPreview, props);

describe('(features/repositoriesSearch) RepositoryPreview component', () => {
  it('should call onOwnerClick with repository owner name on repository owner click', () => {
    const onOwnerClick = jest.fn();
    const component = getComponent({ onOwnerClick });
    const ownerAttribute: ShallowWrapper<IRepositoryAttributeProps> = component
      .find(RepositoryAttribute)
      .find({ type: 'owner' });
    const onValueClick = ownerAttribute.prop('onValueClick');
    if (onValueClick) {
      onValueClick();
    }
    expect(onOwnerClick).toHaveBeenCalledWith(props.repository.owner.username);
  });
});
