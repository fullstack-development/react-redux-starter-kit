import * as React from 'react';
import { bind } from 'decko';

import { injectable } from 'inversify';
import { inject, TYPES } from './configureIoc';

import { IFeatureEntry, Omit } from 'shared/types/app';

import * as categorySelectFeature from 'features/categorySelect';

interface IContainerTypes {
  CategorySelect: categorySelectFeature.Entry['containers']['CategorySelect'];
}

type Container = keyof IContainerTypes;

interface IEntryWithContainer<K extends string, T> {
  containers: {[D in K]: T };
}

type LoadersMap = {
  [P in Container]: () => Promise<IEntryWithContainer<P, IContainerTypes[P]>>;
};

type GenericLoadersMap = {
  [P in Container]: () => Promise<IEntryWithContainer<Container, IContainerTypes[Container]>>;
};

const containerLoadersDictionary: LoadersMap = {
  CategorySelect: categorySelectFeature.loadEntry,
};

interface IState {
  containers: {
    [key: string]: React.ComponentType<any>;
  };
}

function containersProvider<L extends Container>(containers: L[], preloader?: React.ReactChild):
  // tslint:disable-next-line:max-line-length
  <Props extends {[K in L]: IContainerTypes[K]}>(WrappedComponent: React.ComponentType<Props>) => React.ComponentClass<Omit<Props, L>> {

  return <Props extends {[K in L]: IContainerTypes[K]}>(
    WrappedComponent: React.ComponentType<Props>,
  ): React.ComponentClass<Omit<Props, L>> => {

    @injectable()
    class ContainersProvider extends React.PureComponent<Omit<Props, L>, IState> {
      public state: IState = { containers: {} };

      @inject(TYPES.connectEntryToStore)
      private connectFeatureToStore: (entry: IFeatureEntry<any, any, any>) => void;

      public componentWillMount() {
        this.load();
      }

      public componentWillUnmount() {
        this.saveContainerToState = null;
      }

      public render() {
        return typeof preloader !== 'undefined' && !this.isAllContainersLoaded()
          ? preloader
          : <WrappedComponent {...this.state.containers} {...this.props} />;
      }

      @bind
      private load() {
        containers.forEach((key) => {
          (containerLoadersDictionary as GenericLoadersMap)[key]().then(bundle => {
            this.connectFeatureToStore(bundle);
            const container = bundle.containers[key];
            if (!container) {
              throw new Error(`ContainersProvider did not find the container "${key}"`);
            }
            this.saveContainerToState && this.saveContainerToState(container, key);
          });
        });
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
