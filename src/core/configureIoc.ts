import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import TYPES from './iocTypes';

const container = new Container();
const { lazyInject } = getDecorators(container);

export { TYPES, container, lazyInject as inject };
