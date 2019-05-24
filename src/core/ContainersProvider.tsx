import React from 'react';
import { autobind } from 'core-decorators';
import { Omit, SubSet } from '_helpers';

import * as usersSearchFeature from 'features/usersSearch';
import { injectable } from 'inversify';
import { inject, TYPES } from './configureIoc';

import { IFeatureEntry, IReduxEntry } from 'shared/types/app';

interface IContainerTypes {
  UserDetails: usersSearchFeature.Entry['containers']['UserDetails'];
}

type Container = keyof IContainerTypes;

type IEntryWithContainer<K extends string, T extends React.ComponentType<any>> = SubSet<IFeatureEntry, {
  containers: { [D in K]: T };
  reduxEntry?: IReduxEntry;
}>;

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
      private connectFeatureToStore!: (entry: IReduxEntry) => void;

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

      @autobind
      private isAllContainersLoaded(): boolean {
        return containers.every(key => Boolean(this.state.containers[key]));
      }
    }

    return ContainersProvider;
  };
}

export { IContainerTypes };
export default containersProvider;
