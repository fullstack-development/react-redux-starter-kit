import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { IDependencies, IReduxEntry } from '../types';

const depsSymbol = Symbol('Deps');
const connectEntryToStoreSymbol = Symbol('connectFeatureToStore');

interface IocTypes {
  [depsSymbol]: IDependencies;
  [connectEntryToStoreSymbol]: (entry: IReduxEntry) => void;
}

const TYPES = {
  Deps: depsSymbol,
  connectEntryToStore: connectEntryToStoreSymbol,
} as const;

const container = new Container();
const { lazyInject } = getDecorators(container);

export { TYPES, container, IocTypes, lazyInject as inject };
