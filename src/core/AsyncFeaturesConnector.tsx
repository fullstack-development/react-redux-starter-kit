import React from 'react';

import { makeCancelable, ICancellablePromise } from 'shared/helpers/makeCancelable';
import { IFeatureEntry } from 'shared/types/app';
import { Omit, GetProps, SubSet } from '_helpers';

import { asyncFeaturesManager } from './AsyncFeaturesManager';

type FeatureLoader = () => Promise<IFeatureEntry>;

// tslint:disable:max-line-length
function withAsyncFeatures<L extends Record<string, FeatureLoader>>(featuresLoaders: L, preloader?: React.ReactChild):
  <Props extends { [K in keyof L]: any }>(WrappedComponent: React.ComponentType<Props>) => React.ComponentType<Omit<Props, keyof L>> {

  const featuresToLoad = Object.keys(featuresLoaders);
  return <Props extends { [K in keyof L]: any }>(
    WrappedComponent: React.ComponentType<Props>,
  ): React.ComponentClass<Omit<Props, keyof L>> => {

    class AsyncFeaturesConnector extends React.PureComponent<Props> {
      public static getJobCreator() {
        return async () => {
          await asyncFeaturesManager.loadFeatures(featuresLoaders);
        };
      }

      private loadFeaturesPromise: ICancellablePromise<void[]> | null = null;

      public componentDidMount() {
        if (!asyncFeaturesManager.areFeaturesLoaded(featuresToLoad)) {
          this.loadFeaturesPromise = makeCancelable(asyncFeaturesManager.loadFeatures(featuresLoaders));
          this.loadFeaturesPromise.promise.then(() => this.forceUpdate());
        }
      }

      public componentWillUnmount() {
        if (this.loadFeaturesPromise) {
          this.loadFeaturesPromise.cancel();
        }
      }

      public render() {
        if (!asyncFeaturesManager.areFeaturesLoaded(featuresToLoad)) {
          return preloader || null;
        } else {
          return <WrappedComponent {...asyncFeaturesManager.getFeaturesEntries(featuresToLoad)} {...this.props} />;
        }
      }
    }

    return AsyncFeaturesConnector;
  };
}

type IFeatureEntryWithContainers<
  C extends Record<string, React.ComponentType<any>>
  > = SubSet<IFeatureEntry, { containers: C }>;

export function getAsyncContainer<C extends Record<string, React.ComponentType<any>>, K extends keyof C>(
  loader: () => Promise<IFeatureEntryWithContainers<C>>, componentName: K,
): React.ComponentClass<GetProps<C[K]>> {
  interface IRenderProps {
    _entry?: IFeatureEntryWithContainers<C>;
  }

  function render({ _entry, ...props }: IRenderProps) {
    if (!_entry || !_entry.containers) { return null; }
    const Container: React.ComponentType<any> = _entry.containers[componentName];
    return <Container {...props} />;
  }

  return withAsyncFeatures({ _entry: loader })(render) as React.ComponentClass<GetProps<C[K]>>;
}

export { withAsyncFeatures };
