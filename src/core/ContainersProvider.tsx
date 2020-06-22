import React from 'react';
import { autobind } from 'core-decorators';
import { injectable } from 'inversify';

import * as usersSearchFeature from 'features/usersSearch';
import { IFeatureEntry, IReduxEntry, IWithContainers } from 'shared/types/app';

import { inject, TYPES } from './configureIoc';


interface IContainerTypes {
  UserDetails: usersSearchFeature.Entry['containers']['UserDetails'];
}

type Container = keyof IContainerTypes;

type IEntryWithContainer<K extends string, T extends React.ComponentType<any>> = IWithContainers<{ [D in K]: T }> & Pick<IFeatureEntry, 'reduxEntry'>;

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

/* eslint max-len: 0 */
function containersProvider<L extends Container>(containers: L[], preloader?: React.ReactChild):
<Props extends { [K in L]: IContainerTypes[K] }>(WrappedComponent: React.ComponentType<Props>) => React.ComponentClass<Omit<Props, L>> {
  return <Props extends { [K in L]: IContainerTypes[K] }>(
    WrappedComponent: React.ComponentType<Props>,
  ): React.ComponentClass<Props> => {
    @injectable()
    class ContainersProvider extends React.PureComponent<Props, IState> {
      public state: IState = { containers: {} };

      @inject(TYPES.connectEntryToStore)
      private connectFeatureToStore!: (entry: IReduxEntry) => void;

      public componentDidMount() {
        this.load();
      }

      public componentWillUnmount() {
        this.saveContainerToState = null;
      }

      // TODO: УДОЛИ
      public render() {
        const { containers: stateContainers } = this.state;

        if (!this.isAllContainersLoaded()) {
          return preloader !== undefined ? preloader : null;
        }
        return <WrappedComponent {...stateContainers} {...this.props} />;
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
      };

      @autobind
      private async load(): Promise<void> {
        await Promise.all(containers.map(key => this.loadFeatureContainer(key)));
      }

      @autobind
      private async loadFeatureContainer(containerKey: Container): Promise<void> {
        const bundle = await (containerLoadersDictionary as GenericLoadersMap)[containerKey]();
        const container = bundle.containers[containerKey];

        bundle.reduxEntry && this.connectFeatureToStore(bundle.reduxEntry);
        if (!container) {
          throw new Error(`ContainersProvider did not find the container "${containerKey}"`);
        }

        this.saveContainerToState && this.saveContainerToState(container, containerKey);
      }

      @autobind
      private isAllContainersLoaded(): boolean {
        const { containers: stateContainers } = this.state;
        return containers.every(key => Boolean(stateContainers[key]));
      }
    }

    return ContainersProvider;
  };
}

export { containersProvider, IContainerTypes };
