import React from 'react';

import { makeCancelable, ICancellablePromise } from 'shared/helpers/makeCancelable';
import { IFeatureEntry } from 'shared/types/app';
import { serverDataWaiterHOC } from 'shared/helpers/bootstrap';
import { SubSet } from '_helpers';

import { asyncFeaturesManager } from './AsyncFeaturesManager';

type FeatureLoader = () => Promise<IFeatureEntry>;

// tslint:disable:max-line-length
function withAsyncFeatures<L extends Record<string, FeatureLoader>>(featuresLoaders: L, fallback?: React.ReactChild):
  <Props extends { [K in keyof L]: any }>(WrappedComponent: React.ComponentType<Props>) => React.ComponentType<Omit<Props, keyof L>> {

  const featuresToLoad = Object.keys(featuresLoaders);
  return <Props extends { [K in keyof L]: any }>(
    WrappedComponent: React.ComponentType<Props>,
  ): React.ComponentClass<Omit<Props, keyof L>> => {

    class AsyncFeaturesConnector extends React.PureComponent<Props> {
      public static areFeaturesLoaded = false; // Needed for correct async feature loading both on client and on server. Bootstrapper fires getJobCreator and waits for async features to connect to redux store/data to load, on the client bootstrapper does the same

      public static getJobCreator() {
        AsyncFeaturesConnector.areFeaturesLoaded = false; // Created once, used by many components. Every component wrapped with this HOC will share single class, thus single static property - areFeaturesLoaded. We want to ensure that all features loaded for each component, so for each of them in the tree we set areFeaturesLoaded to false
        return async () => {
          await asyncFeaturesManager.loadFeatures(featuresLoaders).then(
            () => AsyncFeaturesConnector.areFeaturesLoaded = true, // subscribe on original promise to mark that features are loaded, because it happens independently if user changed page or not
          );
        };
      }

      private loadFeaturesPromise: ICancellablePromise<void[]> | null = null;

      public componentDidMount() {
        if (!AsyncFeaturesConnector.areFeaturesLoaded) {
          // makeCancellable needed to ensure that forceUpdate wasn't called if component was unmounted
          this.loadFeaturesPromise = makeCancelable(
            asyncFeaturesManager.loadFeatures(featuresLoaders).then((res) => {
              AsyncFeaturesConnector.areFeaturesLoaded = true; // the same logic like in getJobCreator
              return res;
            }),
          );
          this.loadFeaturesPromise.promise.then(() => this.forceUpdate());
        }
      }

      public componentWillUnmount() {
        if (this.loadFeaturesPromise) {
          this.loadFeaturesPromise.cancel();
        }
      }

      public render() {
        if (!AsyncFeaturesConnector.areFeaturesLoaded) {
          return fallback || null;
        } else {
          return <WrappedComponent {...asyncFeaturesManager.getFeaturesEntries(featuresToLoad)} {...this.props} />;
        }
      }
    }

    return serverDataWaiterHOC(AsyncFeaturesConnector);
  };
}

type IFeatureEntryWithContainers<C extends Record<string, React.ComponentType<any>>> = SubSet<
  IFeatureEntry, { containers: C }
>;

export function getAsyncContainer<C extends Record<string, React.ComponentType<any>>, K extends keyof C>(
  loader: () => Promise<IFeatureEntryWithContainers<C>>, componentName: K,
): C[K] {
  interface IRenderProps {
    _entry?: IFeatureEntryWithContainers<C>;
  }

  function render({ _entry, ...props }: IRenderProps) {
    if (!_entry || !_entry.containers) { return null; }
    const Container: React.ComponentType<any> = _entry.containers[componentName];
    return <Container {...props} />;
  }

  return withAsyncFeatures({ _entry: loader })(render) as C[K];
}

export { withAsyncFeatures };
