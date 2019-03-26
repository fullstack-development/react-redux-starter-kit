import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

const TYPES = {
  Deps: Symbol('Deps'),
  connectEntryToStore: Symbol('connectFeatureToStore'),
};

const container = new Container();
const { lazyInject } = getDecorators(container);

export { TYPES, container, lazyInject as inject };
