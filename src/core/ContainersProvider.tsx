import React from 'react';
import { bind } from 'decko';
import { Omit } from '_helpers';

import * as usersSearchFeature from 'features/usersSearch';
import { injectable } from 'inversify';
import { inject, TYPES } from './configureIoc';

import { IFeatureEntry } from 'shared/types/app';

interface IContainerTypes {
  UserDetails: usersSearchFeature.Entry['containers']['UserDetails'];
}

type Container = keyof IContainerTypes;

interface IEntryWithContainer<K extends string, T> {
  containers: { [D in K]: T };
}

type Loader<T extends Container> = () => Promise<IEntryWithContainer<T, IContainerTypes[T]>>;

type LoadersMap = {
  [P in Container]: Loader<P>;
};

type GenericLoadersMap = {
  [P in Container]: Loader<Container>;
};

const containerLoadersDictionary: LoadersMap = {
  UserDetails: usersSearchFeature.loadEntry,
};

interface IState {
  containers: {
    [key: string]: React.ComponentType<any>;
  };
}

// tslint:disable:max-line-length
function containersProvider<L extends Container>(containers: L[], preloader?: React.ReactChild):
  <Props extends { [K in L]: IContainerTypes[K] }>(WrappedComponent: React.ComponentType<Props>) => React.ComponentClass<Omit<Props, L>> {

  return <Props extends { [K in L]: IContainerTypes[K] }>(
    WrappedComponent: React.ComponentType<Props>,
  ): React.ComponentClass<Props> => {

    @injectable()
    class ContainersProvider extends React.PureComponent<Props, IState> {
      public state: IState = { containers: {} };

      @inject(TYPES.connectEntryToStore)
      private connectFeatureToStore!: (entry: IFeatureEntry<any, any, any>) => void;

      public componentDidMount() {
        this.load();
      }

      public componentWillUnmount() {
        this.saveContainerToState = null;
      }
      // TODO: УДОЛИ
      public render() {
        if (!this.isAllContainersLoaded()) {
          return preloader !== void 0 ? preloader : null;
        } else {
          return <WrappedComponent {...this.state.containers} {...this.props} />;
        }
      }

      @bind
      private async load(): Promise<void> {
        await Promise.all(containers.map(key => this.loadFeatureContainer(key)));
      }

      @bind
      private async loadFeatureContainer(containerKey: Container): Promise<void> {
        const bundle = await (containerLoadersDictionary as GenericLoadersMap)[containerKey]();
        const container = bundle.containers[containerKey];

        this.connectFeatureToStore(bundle);
        if (!container) {
          throw new Error(`ContainersProvider did not find the container "${containerKey}"`);
        }

        this.saveContainerToState && this.saveContainerToState(container, containerKey);
      }

      private saveContainerToState: null | ((container: React.ComponentType<any>, key: string) => void) =
        (cont, key) => {
          this.setState(state => ({
            ...state,
            containers: {
              ...state.containers,
              [key]: cont,
            },
          }));
        }

      @bind
      private isAllContainersLoaded(): boolean {
        return containers.every(key => Boolean(this.state.containers[key]));
      }
    }

    return ContainersProvider;
  };
}

export { IContainerTypes };
export default containersProvider;
